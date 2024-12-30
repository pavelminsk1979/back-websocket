import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { io, Socket } from 'socket.io-client';
import { AppModule } from '../src/app.module';

describe('ws-tests', () => {
  let app: INestApplication;
  let httpServer: any;
  let dataAddress: any;
  let participantClient: Socket;
  let adminClient: Socket;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
    dataAddress = httpServer.listen().address();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const baseAdress = `http://[${dataAddress.address}]:${dataAddress.port}/`;

    adminClient = await new Promise((res) => {
      const option = {
        extraHeaders: {
          token: '123',
          roomKey: 'room-test1',
        },
      };

      const client = io(baseAdress + 'admin', option);
      client.on('connect', () => {
        res(client);
      });
    });

    participantClient = await new Promise((res) => {
      const option = {
        extraHeaders: {
          participantId: '2',
          roomKey: 'room-test2',
        },
      };

      const client = io(baseAdress + 'participant', option);
      client.on('connect', () => {
        res(client);
      });
    });
  });
  afterEach(() => {
    participantClient.disconnect();
    adminClient.disconnect();
  });

  /*тестирую метод handleEvent из 
    файла  admin.service.ts*/

  it('should', async function () {
    const testObj = { value: 'test', id: '12' };
    adminClient.emit('server-path', testObj);

    const result = await new Promise((res) => {
      adminClient.on('client-path', (data) => {
        res(data);
      });
    });

    expect(result).toEqual({
      type: 'someType',
      dto: { value: 'test', id: '12' },
    });
  });
});
