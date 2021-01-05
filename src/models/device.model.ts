import { Column, ForeignKey, PrimaryKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Device extends Model<Device> {
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @Column
    region: string;

    @Column
    location: string;

    @Column
    model_name: string;

    @Column
    is_replacement: boolean;

    @Column
    is_error: boolean;
}