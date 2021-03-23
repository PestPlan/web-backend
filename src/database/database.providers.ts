import mongoose = require('mongoose');
import { Sequelize } from 'sequelize-typescript';
import { mariaDBConfig, mongoDBOptions, mongoDBURI } from './database.config';
import { Device } from '../models/entities/device.entity';
import { User } from '../models/entities/user.entity';

// provide

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (): Promise<Sequelize> => {
            const sequelize: Sequelize = new Sequelize(mariaDBConfig);
            sequelize.addModels([Device, User]);
            await sequelize.sync();
            return sequelize;
        },
    },
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> => mongoose.connect(mongoDBURI, mongoDBOptions),
    },
];
