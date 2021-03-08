import { Schema } from 'mongoose';

export interface MouseWarning {
    readonly inclination: string;
    readonly power: string;
    readonly voltage: string;
    readonly flag: string;
    readonly capture: string;
}

export const MouseWarningSchema = new Schema({
    inclination: String,
    power: String,
    voltage: String,
    flag: String,
    capture: String,
});
