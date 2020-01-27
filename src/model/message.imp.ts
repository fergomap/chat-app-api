import Message from './message';
import moment, {Moment} from 'moment';
import {JsonObject, JsonProperty} from "json2typescript";
import {MomentDeserializer} from './deserializers/moment.deserializer';

@JsonObject('MessageImp')
export default class MessageImp implements Message {

    @JsonProperty('emitter')
    emitter: string;

    @JsonProperty('receiver')
    receiver: string;

    @JsonProperty('message')
    message: string;

    @JsonProperty('timestamp', MomentDeserializer)
    timestamp: Moment;

    @JsonProperty('chatId')
    chatId: string;

    constructor(emitter: string = '', receiver: string = '', message: string = '', timestamp: Moment = moment(), chatId: string = '') {
        this.emitter = emitter;
        this.receiver = receiver;
        this.message = message;
        this.timestamp = timestamp;
        this.chatId = chatId;
    }
}
