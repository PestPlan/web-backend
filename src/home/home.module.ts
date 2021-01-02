import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/login/model/user.model';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        AuthModule
    ],
    controllers: [HomeController],
    providers: [HomeService],
})
export class HomeModule {}
