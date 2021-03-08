import { Document, Schema } from 'mongoose';
import { SPU, SPUSchema } from './SPU.schema';

export interface Packet extends Document {
    readonly is_read: boolean;
    readonly SPU: SPU;
}

export const PacketSchema = new Schema({
    is_read: Boolean,
    SPU: SPUSchema,
});
