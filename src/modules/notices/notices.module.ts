import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { devicesProviders } from '../../models/providers/devices.providers';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

@Module({
    imports: [DatabaseModule],
    controllers: [NoticesController],
    providers: [NoticesService, ...devicesProviders],
})
export class NoticesModule {}
