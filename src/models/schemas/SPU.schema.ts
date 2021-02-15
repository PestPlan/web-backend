import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MPUDocument, MPUSchema } from './MPU.schema';

export type SPUDocument = SPU & Document;

@Schema({ versionKey: false })
export class SPU {
    @Prop()
    SPUIndex: string;

    @Prop()
    rawData: string;

    @Prop()
    ver: string;

    @Prop()
    damId: string;

    @Prop()
    damIdType: string;

    @Prop({ type: MPUSchema })
    MPU: MPUDocument;
}

export const SPUSchema = SchemaFactory.createForClass(SPU);
