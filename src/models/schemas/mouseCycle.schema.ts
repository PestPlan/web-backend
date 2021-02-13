import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MousceCycleDocument = MouseCycle & Document;

@Schema({ versionKey: false })
export class MouseCycle {
    @Prop()
    capture: number;

    @Prop()
    voltage: string;

    @Prop()
    rssi: number;

    @Prop()
    statusCode: number;
}

export const MouseCycleSchema = SchemaFactory.createForClass(MouseCycle);
