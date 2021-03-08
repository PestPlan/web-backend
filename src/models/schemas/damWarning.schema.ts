import { Schema } from 'mongoose';

export interface DamWarning {
    readonly temperature: string;
    readonly vibration: string;
    readonly power: string;
}

export const DamWarningSchema = new Schema({
    temperature: String,
    vibration: String,
    power: String,
});
