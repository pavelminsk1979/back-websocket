import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketParticipantService } from '../participant/participant.service';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/admin' })
export class SocketAdminService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(protected socketParticipantService: SocketParticipantService) {}

  @SubscribeMessage('server-path')
  handleEvent(@MessageBody() dto: any, @ConnectedSocket() client: Socket) {
    const res = { type: 'someType', dto };
    client.emit('client-path', res);

    this.socketParticipantService.handleEvent(res);
  }

  handleConnection(client: Socket): any {
    const token = client.handshake.headers.token;
    if (token !== '123') {
      this.forceDisconnect(client, 'Incorrect  token');
      return;
    }
  }

  handleDisconnect(client: any): any {}

  forceDisconnect(client: Socket, message) {
    client.emit('error-path', message);
    client.disconnect(true);
  }
}
