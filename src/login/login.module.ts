import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { User } from '../models/user.model';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        AuthModule,
    ],
    controllers: [LoginController],
    providers: [LoginService]
})
export class LoginModule {}
