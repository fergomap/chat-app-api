import CreateChat from './create-chat';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('CreateChatImp')
export default class CreateChatImp implements CreateChat {

    @JsonProperty('emitter')
    emitter: string;

    @JsonProperty('receiver')
    receiver: string;

    constructor(emitter: string = '', receiver: string = '') {
        this.emitter = emitter;
        this.receiver = receiver;
    }
}
