import Message from './message';

export default interface Chat {
    id: string;
    user1: string;
    user2: string;
    messages: Message[];
}
