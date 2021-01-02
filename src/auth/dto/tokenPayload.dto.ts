import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class TokenPayloadDto {
    @IsNumber()
    @IsPositive()
    readonly sub: number;
    
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    
    @IsNumber()
    @Min(0)
    readonly device_cnt: number;
    
    @IsNumber()
    readonly iat: number;

    @IsNumber()
    readonly exp: number;
}