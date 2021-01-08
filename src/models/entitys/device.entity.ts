import { Column, ForeignKey, PrimaryKey, Model, Table, DataType } from 'sequelize-typescript';
import { User } from './user.entity';

// const tableOptions: IDefineOptions = {
//     timestamp: true,
//     tableName: 'users',
// } as IDefineOptions;

@Table({})
export class Device extends Model<Device> {
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @Column
    trap_id: number;

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
