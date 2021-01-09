import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class InfoDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    
    @IsNumber()
    @Min(0)
    readonly device_cnt: number;

    @IsNumber()
    readonly notice_cnt: number;
}