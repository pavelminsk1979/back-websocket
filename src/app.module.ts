import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketAdminModule } from './websocket/admin/admin.module';
import { SocketParticipantModule } from './websocket/participant/participant.module';
import { SocketParticipantService } from './websocket/participant/participant.service';

@Module({
  imports: [SocketAdminModule, SocketParticipantModule],
  controllers: [AppController],
  providers: [AppService, SocketParticipantService],
})
export class AppModule {}
