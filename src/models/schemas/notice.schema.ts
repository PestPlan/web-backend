import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NoticeDocument = Notice & Document;

@Schema({ versionKey: false })
export class Notice {
    @Prop()
    device_id: string;

    @Prop()
    created_at: Date;

    @Prop()
    type: string;

    @Prop()
    is_read: boolean;

    @Prop()
    packet: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
