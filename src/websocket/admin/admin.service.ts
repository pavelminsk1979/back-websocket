import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketAdminService implements OnGatewayConnection {
  @SubscribeMessage('server-path')
  handleEvent(@MessageBody() dto: any, @ConnectedSocket() client: any) {
    const res = { type: 'someType', dto };
    client.emit('client-path', res);
    console.log('dto:', dto);
  }

  handleConnection(client: any): any {
    console.log(client);
  }
}
