import { Schema } from 'mongoose';
import { MPU, MPUSchema } from './MPU.schema';

export interface SPU {
    readonly SPUIndex: string;
    readonly rawData: string;
    readonly ver: string;
    readonly damId: string;
    readonly damIdType: string;
    readonly MPU: MPU;
}

export const SPUSchema = new Schema({
    SPUIndex: String,
    rawData: String,
    ver: String,
    damId: String,
    damIdType: String,
    MPU: MPUSchema,
})
