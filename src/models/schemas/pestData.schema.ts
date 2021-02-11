import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PestDataDocument = PestData & Document;

@Schema({ versionKey: false })
export class PestData {
    @Prop()
    capture: number;

    @Prop()
    temperature: string;

    @Prop()
    sensorDuty: string;

    @Prop()
    panDuty: string;

    @Prop()
    panRpm: number;

    @Prop()
    statusCode: number;
}

export const PestDataSchema = SchemaFactory.createForClass(PestData);
