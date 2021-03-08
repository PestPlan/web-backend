import { Schema } from 'mongoose';
import { PestData, PestDataSchema } from './pestData.schema';
import { MouseCycle, MouseCycleSchema } from './mouseCycle.schema';
import { MouseWarning, MouseWarningSchema } from './mouseWarning.schema';
import { SnapShot, SnapShotSchema } from './snapShot.schema';
import { DamWarning, DamWarningSchema } from './damWarning.schema';

export interface MPU {
    readonly MPUIndex: string;
    readonly time: string;
    readonly rssi: number;
    readonly device: boolean;
    readonly trapId: string;
    readonly trapIdType: string;
    readonly cmd: string;
    readonly item: string;
    readonly dataType: string;
    readonly pest: PestData;
    readonly mouseCycle: MouseCycle;
    readonly mouseWarning: MouseWarning;
    readonly snapShot: SnapShot;
    readonly damWarning: DamWarning;
}

export const MPUSchema = new Schema({
    MPUIndex: String,
    time: String,
    rssi: Number,
    device: Boolean,
    trapId: String,
    trapIdType: String,
    cmd: String,
    item: String,
    dataType: String,
    pest: PestDataSchema,
    mouseCycle: MouseCycleSchema,
    mouseWarning: MouseWarningSchema,
    snapShot: SnapShotSchema,
    damWarning: DamWarningSchema,
});
