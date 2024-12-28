import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SocketParticipantService } from './websocket/participant/participant.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    protected socketParticipantService: SocketParticipantService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('event')
  sendMessagePaticipant(@Body() data: { participantId: string }) {
    this.socketParticipantService.sendMessagePaticipant(data.participantId);
    return true;
  }
}
