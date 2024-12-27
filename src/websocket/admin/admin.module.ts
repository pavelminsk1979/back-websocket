import { Module } from '@nestjs/common';
import { SocketAdminService } from './admin.service';
import { SocketParticipantService } from '../participant/participant.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketAdminService, SocketParticipantService],
})
export class SocketAdminModule {}
