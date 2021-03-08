import { Schema } from 'mongoose';

export interface SnapShot {
    readonly imageData: string;
    readonly imageIndex: number;
}

export const SnapShotSchema = new Schema({
    imageData: String,
    imageIndex: Number,
});
