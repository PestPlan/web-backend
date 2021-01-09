import { Table, Model, Column, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column
    id: number;

    @Column
    username: string;

    @Column
    password: string;

    @Column
    salt: string;

    @Column
    device_cnt: number;
}
