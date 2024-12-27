import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/participant' })
export class SocketParticipantService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Map<Socket, string> = new Map();

  @WebSocketServer()
  server: Server;

  handleEvent() {}

  handleConnection(client: Socket): any {
    const roomKey = client.handshake.headers.roomkey;
    const participantId = client.handshake.headers.participantid as string;
    this.clients.set(client, participantId);
    client.join(`room_${roomKey}`);
  }

  handleDisconnect(client: any): any {}
}
