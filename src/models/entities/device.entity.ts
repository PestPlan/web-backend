import { Column, ForeignKey, PrimaryKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({})
export class Device extends Model<Device> {
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @Column
    trap_id: string;

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

    @Column
    created_at: Date;
}
