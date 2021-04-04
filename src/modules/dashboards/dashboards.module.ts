import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { devicesProviders } from 'src/models/providers/devices.providers';
import { packetsProviders } from 'src/models/providers/packets.providers';
import { HomeModule } from '../home/home.module';
import { DashboardsController } from './dashboards.controller';
import { DashboardsService } from './dashboards.service';

@Module({
    imports: [DatabaseModule, HomeModule],
    controllers: [DashboardsController],
    providers: [DashboardsService, ...devicesProviders, ...packetsProviders],
})
export class DashboardsModule {}
