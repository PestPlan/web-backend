import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from 'src/models/providers/users.providers';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [LoginController],
    providers: [LoginService, ...usersProviders],
})
export class LoginModule {}
