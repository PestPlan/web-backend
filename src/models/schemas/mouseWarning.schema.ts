import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MouseWarningDocument = MouseWarning & Document;

@Schema({ versionKey: false })
export class MouseWarning {
    @Prop()
    inclination: string;

    @Prop()
    power: string;

    @Prop()
    voltage: string;

    @Prop()
    flag: string;

    @Prop()
    capture: string;
}

export const MouseWarningSchema = SchemaFactory.createForClass(MouseWarning);
