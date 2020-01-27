import Chat from './chat';
import Message from './message';
import {JsonObject, JsonProperty} from 'json2typescript';
import MessageImp from './message.imp';

@JsonObject('ChatImp')
export default class ChatImp implements Chat {

    @JsonProperty('emitter')
    id: string;

    @JsonProperty('user1')
    user1: string;

    @JsonProperty('user2')
    user2: string;

    @JsonProperty('messages', [MessageImp])
    messages: Message[];

    constructor(id: string = '', user1: string = '', user2: string = '', messages: Message[] = []) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.messages = messages;
    }
}
