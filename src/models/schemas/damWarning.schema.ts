import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DamWarningDocument = DamWarning & Document;

@Schema({ versionKey: false })
export class DamWarning {
    @Prop()
    temperature: string;

    @Prop()
    vibration: string;

    @Prop()
    power: string;
}

export const DamWarningSchema = SchemaFactory.createForClass(DamWarning);
