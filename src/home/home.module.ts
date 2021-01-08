import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from '../models/providers/users.providers';
import { devicesProviders } from '../models/providers/devices.providers';
import { noticesProviders } from '../models/providers/notices.providers';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [HomeController],
    providers: [HomeService, ...usersProviders, ...devicesProviders, ...noticesProviders],
})
export class HomeModule {}
