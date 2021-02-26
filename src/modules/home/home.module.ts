import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { DatabaseModule } from '../../database/database.module';
import { usersProviders } from '../../models/providers/users.providers';
import { devicesProviders } from '../../models/providers/devices.providers';
import { packetsProviders } from '../../models/providers/packets.providers';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [HomeController],
    providers: [HomeService, ...usersProviders, ...devicesProviders, ...packetsProviders],
    exports: [HomeService],
})
export class HomeModule {}
