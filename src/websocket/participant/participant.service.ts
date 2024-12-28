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

  handleEvent(res: any) {
    const response = res.dto.value;
    console.log(response);
    const savedClient = Array.from(this.clients.keys())[0]; // Получаем первого клиента
    savedClient.emit('participant-path', response);
  }

  handleConnection(client: Socket): any {
    const roomKey = client.handshake.headers.roomkey;
    const participantId = client.handshake.headers.participantid as string;
    this.clients.set(client, participantId);
    client.join(`room_${roomKey}`);
  }

  handleDisconnect(client: any): any {}

  sendMessagePaticipant(id) {
    for (const [savedClient, savedParticipantId] of this.clients) {
      if (savedParticipantId === id) {
        savedClient.emit('participant-event', `send event ${id}`);
      } else {
        savedClient.emit('participant-event', `error incorrect id`);
      }
    }
  }
}
