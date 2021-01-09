import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/entities/user.entity';
import { Device } from '../models/entities/device.entity';
import { Notice } from '../models/entities/notice.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mariadb',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'pest',
            });
            sequelize.addModels([User, Device, Notice]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
