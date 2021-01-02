import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/login/model/user.model';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        AuthModule
    ],
    controllers: [MainController],
    providers: [MainService],
})
export class MainModule {}
