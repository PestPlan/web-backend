import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class UserInfoDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    
    @IsNumber()
    @Min(0)
    readonly device_cnt: number;
}