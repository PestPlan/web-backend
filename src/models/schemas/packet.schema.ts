import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SPUDocument, SPUSchema } from './SPU.schema';

export type PacketDocument = Packet & Document;

@Schema({ versionKey: false })
export class Packet {
    @Prop()
    is_read: boolean;

    @Prop({ type: SPUSchema })
    SPU: SPUDocument;
}

export const PacketSchema = SchemaFactory.createForClass(Packet);
