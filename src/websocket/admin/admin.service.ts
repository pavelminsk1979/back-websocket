import {
  ConnectedSocket,
  OnGatewayConnection,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketAdminService implements OnGatewayConnection {
  handleEvent(dto: any, @ConnectedSocket() client: any) {
    const res = { type: 'someType', dto };
    client.emit('client-path', res);
  }

  handleConnection(client: any): any {
    console.log('ПРОИЗОШЛО ПОДКЛЮЧЕНИЕ ПО WEBSOKET');
    console.log('СОДЕРЖИМОЕ ОБЬЕКТА client');

    console.log(client);
  }

  // когда фронтенд будет подключатся к WebSocketСЕРВИСУ
  // тогда фронтенд отправит запрос на уУСТАНОВЛЕНИЕ СОЕДЕНЕНИЯ
  // и тогда отработает этот метод

  /* в этом методе например будет ПРОВЕРКА АУТЕНТИФМКАЦИИ Клиента
  -тоесть его логин и парол проверятся
  -------ИЛИ ТОКЕН ПРОВЕРИТСЯ
  ----ИЛИ УВЕДОМИТЬ КАКИХ ЛИБО ПОЛЬЗОВАТЕЛЕЙ О ПОДКЛЮЧЕНИИ*/
}
