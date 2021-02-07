import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, DEVICE_MODEL } from 'src/constants/constants';
import { DeviceSchema } from '../schemas/device.schema';

export const devicesProviders = [
    {
        provide: DEVICE_MODEL,
        useFactory: (connection: Connection) => connection.model(DEVICE_MODEL, DeviceSchema),
        inject: [DATABASE_CONNECTION],
    }
]