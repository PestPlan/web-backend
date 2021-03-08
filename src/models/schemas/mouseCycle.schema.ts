import { Schema } from 'mongoose';

export interface MouseCycle {
    readonly capture: number;
    readonly voltage: string;
    readonly rssi: number;
    readonly statusCode: number;
}

export const MouseCycleSchema = new Schema({
    capture: Number,
    voltage: String,
    rssi: Number,
    statusCode: Number,
});
