import User from 'user';
import Message from 'message';

export default class ChatMessage {
    constructor(private user: User, message: Message) {}
}
