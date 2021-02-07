import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NoticeDocument = Notice & Document;

@Schema({ versionKey: false })
export class Notice {
    @Prop()
    device_id: string;

    @Prop()
    type: string;

    @Prop()
    created_at: Date;

    @Prop()
    is_read: boolean;

    @Prop()
    contents: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
