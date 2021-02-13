import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PestDataDocument, PestDataSchema } from './pestData.schema';
import { MousceCycleDocument, MouseCycleSchema } from './mouseCycle.schema';
import { MouseWarningDocument, MouseWarningSchema } from './mouseWarning.schema';
import { SnapShotDocument, SnapShotSchema } from './snapShot.schema';
import { DamWarningDocument, DamWarningSchema } from './damWarning.schema';

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
    trapIdType: string;

    @Prop()
    cmd: string;

    @Prop()
    item: string;

    @Prop()
    dataType: string;

    @Prop({ type: PestDataSchema })
    pest: PestDataDocument;

    @Prop({ type: MouseCycleSchema })
    mouseCycle: MousceCycleDocument;

    @Prop({ type: MouseWarningSchema })
    mouseWarning: MouseWarningDocument;

    @Prop({ type: SnapShotSchema })
    snapShot: SnapShotDocument;

    @Prop({ type: DamWarningSchema })
    damWarning: DamWarningDocument;
}

export const MPUSchema = SchemaFactory.createForClass(MPU);
