import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DevicesModule } from './modules/devices/devices.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { PacketsModule } from './modules/packets/packets.module';
import { DashboardsModule } from './modules/dashboards/dashboards.module';

@Module({
    imports: [AuthModule, HomeModule, LoginModule, PacketsModule, DevicesModule, DashboardsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
