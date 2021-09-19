import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketclusterService {
    uidChannels = [];
    http = require('http');
    socketClusterServer = require('socketcluster-server');
    options = {
    };
    httpServer = this.http.createServer();
    agServer = this.socketClusterServer.attach(this.httpServer, this.options);

    async startSocketClusterServer() {

        console.log('hello');
        const connections = [];

        (async () => {
            // Handle new inbound sockets.
            for await (let { socket } of this.agServer.listener('channelName')) {
                connections.push(socket);
                connections.forEach(e => console.log('array' + e.id));

            }
        })();

        // port 8000
        this.httpServer.listen(8000);
    }

    async sendMessage(fileInfo: any) {
        console.log('messages Sended to client');
        
        try {
            await this.agServer.exchange.transmitPublish("channelName", "This is some data sended from server " + fileInfo);
        } catch (error) {
            console.log(error);
        }
    }
}