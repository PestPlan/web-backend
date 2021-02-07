import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class TokenPayloadDto {
    @IsNumber()
    @IsPositive()
    readonly sub: number;
    
    @IsString()
    @IsNotEmpty()
    readonly username: string;
}