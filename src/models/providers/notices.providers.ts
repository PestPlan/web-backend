import { Connection } from "mongoose";
import { DATABASE_CONNECTION, NOTICE_MODEL } from "src/constants/constants";
import { NoticeSchema } from '../schemas/notice.schema';

export const noticesProviders = [
    {
        provide: NOTICE_MODEL,
        useFactory: (connection: Connection) => connection.model(NOTICE_MODEL, NoticeSchema),
        inject: [DATABASE_CONNECTION],
    }
]