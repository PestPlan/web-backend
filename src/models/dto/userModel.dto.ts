import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class UserModelDto {
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