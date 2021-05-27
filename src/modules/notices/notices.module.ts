import { Module } from '@nestjs/common';
import { devicesProviders } from 'src/models/providers/devices.providers';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

@Module({
    controllers: [NoticesController],
    providers: [NoticesService, ...devicesProviders],
})
export class NoticesModule {}
