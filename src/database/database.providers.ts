import { Sequelize } from 'sequelize-typescript';
import * as mongoose from 'mongoose';
import { MARIADB_PROVIDE, MONGODB_PROVIDE } from 'src/constants/constants';
import { mariaDBConfig, mongoDBOptions, mongoDBURI } from './database.config';
import { Device } from 'src/models/entities/device.entity';
import { User } from 'src/models/entities/user.entity';

export const databaseProviders = [
    {
        provide: MARIADB_PROVIDE,
        useFactory: async (): Promise<Sequelize> => {
            const sequelize: Sequelize = new Sequelize(mariaDBConfig);
            sequelize.addModels([Device, User]);
            await sequelize.sync();
            return sequelize;
        },
    },
    {
        provide: MONGODB_PROVIDE,
        useFactory: (): Promise<typeof mongoose> => 
            mongoose.connect(mongoDBURI, mongoDBOptions)
    },
];
