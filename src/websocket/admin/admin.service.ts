import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  //OnGatewayInit,
  WebSocketGateway,
  //WebSocketServer,
} from '@nestjs/websockets';

//import { Server } from 'socket.io';

const corsOption = {
  origin: '*',
};

@WebSocketGateway({ cors: { corsOption } })
export class SocketAdminService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  /*@WebSocketServer()
  server: Server;*/

  handleConnection(client: any, ...args): any {}

  handleDisconnect(client: any): any {}

  //afterInit(server: Server) {}
}
