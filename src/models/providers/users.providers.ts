import { Connection } from 'mongoose';
import { USER_MODEL, DATABASE_CONNECTION } from 'src/constants/constants';
import { UserSchema } from '../schemas/user.schema';

export const usersProviders = [
    {
        provide: USER_MODEL,
        useFactory: (connection: Connection) => connection.model(USER_MODEL, UserSchema),
        inject: [DATABASE_CONNECTION],
    }
]