import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DatabaseModule } from 'src/database/database.module';
import { devicesProviders } from 'src/models/providers/devices.providers';
import { packetsProviders } from 'src/models/providers/packets.providers';
import { HomeModule } from 'src/modules/home/home.module';

@Module({
    imports: [DatabaseModule, HomeModule],
    providers: [DevicesService, ...devicesProviders, ...packetsProviders],
    controllers: [DevicesController],
    exports: [DevicesService],
})
export class DevicesModule {}
