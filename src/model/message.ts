import { Moment } from 'moment';

export default interface Message {
    emitter: string;
    receiver: string;
    message: string;
    timestamp: Moment;
    chatId: string;
}