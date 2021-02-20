import { Connection } from "mongoose";
import { MONGODB_PROVIDE, PACKET_PROVIDE } from "src/constants/constants";
import { PacketSchema } from '../schemas/packet.schema';

export const packetsProviders = [
    {
        provide: PACKET_PROVIDE,
        useFactory: (connection: Connection) => connection.model(PACKET_PROVIDE, PacketSchema),
        inject: [MONGODB_PROVIDE],
    }
]
