import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/models/providers/users.providers';
import { devicesProviders } from 'src/models/providers/devices.providers';
import { packetsProviders } from 'src/models/providers/packets.providers';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [HomeController],
    providers: [HomeService, ...usersProviders, ...devicesProviders, ...packetsProviders],
    exports: [HomeService],
})
export class HomeModule {}
