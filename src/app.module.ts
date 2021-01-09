import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/login/login.module';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { User } from './models/entities/user.entity';
import { Device } from './models/entities/device.entity';
import { Notice } from './models/entities/notice.entity';

@Module({
    imports: [
        LoginModule,
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
        HomeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
