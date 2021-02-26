import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsNumber()
    readonly device_cnt: number;
}
