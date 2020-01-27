import Client from './client';
import {Response} from 'express';

export default class ClientImp implements Client {
    username: string;
    response: Response;
    connected: boolean;

    constructor(username: string = '', response: Response = {} as any, connected: boolean = false) {
        this.username = username;
        this.response = response;
        this.connected = connected;
    }
}
