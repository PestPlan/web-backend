import { Schema } from 'mongoose';

export interface PestData {
    readonly capture: number;
    readonly temperature: string;
    readonly sensorDuty: string;
    readonly panDuty: string;
    readonly panRpm: number;
    readonly statusCode: number;
}

export const PestDataSchema = new Schema({
    capture: Number,
    temperature: String,
    sensorDuty: String,
    panDuty: String,
    panRpm: Number,
    statusCode: Number,
});
