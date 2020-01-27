import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {APP_CONSTANTS} from './config/app.config';
import Client from './model/client';
import ClientImp from './model/client.imp';
import Message from './model/message';
import {EventsEnum} from './model/events.enum';
import Chat from './model/chat';
import {JsonConvert} from "json2typescript";
import MessageImp from './model/message.imp';
import ChatImp from './model/chat.imp';
import CreateChat from './model/create-chat';
import CreateChatImp from './model/create-chat.imp';

const jsonConvert: JsonConvert = new JsonConvert();
const app = express();

const chatsHandler = (request: Request, response: Response): void => {
    console.log(request.params.username + ' is connected');
    response.writeHead(APP_CONSTANTS.RESPONSE_CODES.OK, APP_CONSTANTS.REALTIME_HEADERS);

    const client: Client = getClient(request.params.username) || new ClientImp();
    const clientChats: Chat[] = [];

    if (client.username) {
        chats.forEach((chat: Chat) => {
            if (chat.id.includes(request.params.username)) {
                clientChats.push(chat);
            }
        });
    } else {
        client.username = request.params.username;
        clients.push(client);
    }
    
    client.response = response;
    client.connected = true;

    response.write(`data: ${JSON.stringify(clientChats)}\n\n`);
    response.on(EventsEnum.CLOSE, () => {
        client.connected = false;
    });
};

const sendEventsToAll = (message: Message): void => {
    clients.forEach((client: Client) => {
        if (client.username === message.emitter || client.username === message.receiver) {
            client.response.write(`data: ${JSON.stringify(message)}\n\n`);
        }
    });
};

const sendMessage = (request: Request, response: Response): void => {
    const message: Message = jsonConvert.deserializeObject(request.body, MessageImp);
    const chat: Chat | undefined = chats.find((c: Chat) => c.id === message.chatId);

    if (chat) {
        chat.messages.push(message);
        sendEventsToAll(message);
        response.send();
    } else {
        response.status(APP_CONSTANTS.RESPONSE_CODES.NOT_FOUND).send('Chat not found!');
    }
};

const getConnectedClients = (request: Request, response: Response): void => {
    response.json({clients: clients.filter((client: Client) => client.connected).length});
};

const searchClient = (request: Request, response: Response): void => {
    const matches: string[] = clients.filter((client: Client) => {
        return client.username !== request.params.emitter &&
            client.username.includes(request.params.receiver);
    }).map((client: Client) => client.username);

    response.send(matches);
};

const checkClientConnected = (request: Request, response: Response): void => {
    response.send(isClientConnected(request.params.username));
};

const getClient = (username: string): Client | undefined => {
    return clients.find((client: Client) => client.username === username);
};

const isClientConnected = (username: string): boolean => {
    const client = getClient(username);
    return client ? client.connected : false;
};

const createChat = (request: Request, response: Response): void => {
    const createChat: CreateChat = jsonConvert.deserializeObject(request.body, CreateChatImp);
    const chatIds: string[] = chats.map((chat: Chat) => chat.id);

    if (!getClient(createChat.emitter)) {
        response.status(APP_CONSTANTS.RESPONSE_CODES.NOT_FOUND).send('Emitter not found!');
    } else if (!getClient(createChat.receiver)) {
        response.status(APP_CONSTANTS.RESPONSE_CODES.NOT_FOUND).send('Receiver not found!');
    } else if (chatIds.includes(createChat.emitter + '-' + createChat.receiver) || chatIds.includes(createChat.receiver + '-' + createChat.emitter)) {
        response.status(APP_CONSTANTS.RESPONSE_CODES.BAD_REQUEST).send('Chat already created!');
    } else {
        const chat: Chat = new ChatImp(`${createChat.emitter}-${createChat.receiver}`, createChat.emitter, createChat.receiver);
        chats.push(chat);
        response.send(chat);
    }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post(APP_CONSTANTS.ENDPOINTS.MESSAGE, sendMessage);
app.get(APP_CONSTANTS.ENDPOINTS.LISTEN_CHATS, chatsHandler);
app.get(APP_CONSTANTS.ENDPOINTS.STATUS, getConnectedClients);
app.get(APP_CONSTANTS.ENDPOINTS.SEARCH_CLIENT, searchClient);
app.get(APP_CONSTANTS.ENDPOINTS.CHECK_CLIENT_CONNECTED, checkClientConnected);
app.post(APP_CONSTANTS.ENDPOINTS.CREATE_CHAT, createChat);

const clients: Client[] = [];
const chats: Chat[] = [];

app.listen(8000);