import { Connection } from 'mongoose';
import { PacketSchema } from '../schemas/packet.schema';

export const packetsProviders = [
    {
        provide: 'Packet',
        useFactory: (connection: Connection) => connection.model('Packet', PacketSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
