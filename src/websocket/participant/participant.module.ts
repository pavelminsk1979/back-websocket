import { Module } from '@nestjs/common';
import { SocketParticipantService } from './participant.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketParticipantService],
})
export class SocketParticipantModule {}
