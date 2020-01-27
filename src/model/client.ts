import {Response} from 'express';

export default interface Client {
    username: string;
    response: Response;
    connected: boolean;
}
