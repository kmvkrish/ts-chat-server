import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';
import Message from './models/Message';

export default class ChatServer {
    public static PORT: String = process.env.PORT || '80';
    private app: express.Application;
    private server: Server;
    private io: socketIO.Server;
    constructor() {
        this.createApp();
        this.createServer();
        this.initSockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private initSockets(): void {
        this.io = socketIO(this.server);
    }

    private listen(): void {
        this.server.listen(ChatServer.PORT, () => {
            console.log(`Running on ${ChatServer.PORT}`);
        });

        this.io.on("connect", (socket) => {
            socket.on("message", (message: Message) => {
                this.io.emit("message", message);
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}
