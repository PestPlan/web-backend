import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PestDataDocument, PestDataSchema } from './pestData.schema';

export type MPUDocument = MPU & Document;

@Schema({ versionKey: false })
class MPU {
    @Prop()
    MPUIndex: string;

    @Prop()
    time: string;

    @Prop()
    rssi: number;

    @Prop()
    device: boolean;

    @Prop()
    trapId: string;

    @Prop()
    trapIdTyp: string;

    @Prop()
    cmd: string;

    @Prop()
    item: string;

    @Prop()
    dataType: string;

    @Prop({ type: PestDataSchema })
    pest: PestDataDocument;
}

export const MPUSchema = SchemaFactory.createForClass(MPU);
