import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { User } from './login/model/user.model';
import { AuthModule } from './auth/auth.module';
import { MainController } from './main/main.controller';
import { MainModule } from './main/main.module';

@Module({
    imports: [LoginModule,
        SequelizeModule.forRoot({
            dialect: 'mariadb',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'test',
            models: [User],
            define: {
                timestamps: false
            }
        }),
        AuthModule,
        MainModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
