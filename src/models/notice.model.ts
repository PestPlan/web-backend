import { Column, ForeignKey, PrimaryKey, Model, Table, BelongsTo } from "sequelize-typescript";
import { Device } from "./device.model";

@Table
export class Notice extends Model<Notice> {
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => Device)
    @Column
    device_id: number;

    @Column
    type: string;

    @Column
    contents: string;

    @Column
    is_readed: boolean;

    @Column
    created_at: Date;

    @BelongsTo(() => Device)
    device: Device;
}