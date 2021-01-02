import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Device } from 'src/models/device.model';
import { Notice } from 'src/models/notice.model';
import { User } from 'src/models/user.model';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
    imports: [
        SequelizeModule.forFeature([User, Device, Notice]),
        AuthModule
    ],
    controllers: [HomeController],
    providers: [HomeService],
})
export class HomeModule {}
