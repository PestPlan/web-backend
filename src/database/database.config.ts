import * as dotenv from 'dotenv';
import { SequelizeOptions } from 'sequelize-typescript';
import { ConnectOptions } from 'mongoose';

dotenv.config({ path: 'src/.env' });

// MariaDB
export const mariaDBConfig: SequelizeOptions = {
    dialect: 'mariadb',
    host: process.env.MARIADB_HOST,
    port: Number(process.env.MARIADB_PORT),
    username: process.env.MARIADB_USERNAME,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    define: {
        timestamps: false,
    }
};

// MongoDB
export const mongoDBURI: string = process.env.MONGODB_URI;
export const mongoDBOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
