import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';

@Module({
    imports: [
        AuthModule,
        HomeModule,
        LoginModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
