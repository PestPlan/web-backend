import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DatabaseModule } from '../../database/database.module';
import { devicesProviders } from '../../models/providers/devices.providers';
import { packetsProviders } from '../../models/providers/packets.providers';
import { HomeModule } from '../../modules/home/home.module';

@Module({
    imports: [DatabaseModule, HomeModule],
    providers: [DevicesService, ...devicesProviders, ...packetsProviders],
    controllers: [DevicesController],
    exports: [DevicesService],
})
export class DevicesModule {}
