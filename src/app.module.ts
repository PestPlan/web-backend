import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { User } from './models/user.model';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { Device } from './models/device.model';
import { Notice } from './models/notice.model';

@Module({
    imports: [LoginModule,
        SequelizeModule.forRoot({
            dialect: 'mariadb',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            models: [User, Device, Notice],
            define: {
                timestamps: false,
            },
            autoLoadModels: true,
        }),
        AuthModule,
        HomeModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
