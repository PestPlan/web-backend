import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DeviceDocument = Device & Document;

@Schema({ versionKey: false })
export class Device {
    @Prop()
    user_id: string;

    // device 정보
    @Prop()
    trap_id: string;

    @Prop()
    region: string;

    @Prop()
    location: string;

    @Prop()
    model_name: string;

    @Prop()
    created_at: Date;

    // device 상태
    @Prop()
    needs_replacement: boolean;

    @Prop()
    is_error: boolean;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
