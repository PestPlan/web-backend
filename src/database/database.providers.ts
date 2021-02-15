import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION, DATABASE_URL } from '../constants/constants';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(DATABASE_URL,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                }
            )
    }
];
