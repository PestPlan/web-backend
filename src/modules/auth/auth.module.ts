import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

dotenv.config({ path: '.env' });

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
