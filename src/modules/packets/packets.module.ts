import { Module } from '@nestjs/common';
import { PacketsService } from './packets.service';
import { PacketsController } from './packets.controller';
import { DatabaseModule } from 'src/database/database.module';
import { packetsProviders } from 'src/models/providers/packets.providers';
import { DevicesModule } from 'src/modules/devices/devices.module';

@Module({
    imports: [DatabaseModule, DevicesModule],
    providers: [PacketsService, ...packetsProviders],
    controllers: [PacketsController],
})
export class PacketsModule {}
