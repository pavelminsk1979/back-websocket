import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketAdminModule } from './websocket/admin/admin.module';

@Module({
  imports: [SocketAdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
