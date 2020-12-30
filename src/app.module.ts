import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { User } from './login/model/user.model';

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
        })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
