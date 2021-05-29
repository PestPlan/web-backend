import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { devicesProviders } from 'src/models/providers/devices.providers';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';

@Module({
    imports: [DatabaseModule],
    controllers: [NoticesController],
    providers: [NoticesService, ...devicesProviders],
})
export class NoticesModule {}
