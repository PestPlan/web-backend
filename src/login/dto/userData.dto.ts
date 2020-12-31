import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Min } from "sequelize-typescript";

export class UserDataDto {
    @IsNumber()
    @IsPositive()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly salt: string;

    @IsNumber()
    @Min(0)
    readonly device_cnt: number;
}