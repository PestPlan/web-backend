import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SnapShotDocument = SnapShot & Document;

@Schema({ versionKey: false })
export class SnapShot {
    @Prop()
    imageData: string;

    @Prop()
    imageIndex: number;
}

export const SnapShotSchema = SchemaFactory.createForClass(SnapShot);
