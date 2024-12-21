import { Module } from '@nestjs/common';
import { SocketAdminService } from './admin.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketAdminService],
})
export class SocketAdminModule {}
