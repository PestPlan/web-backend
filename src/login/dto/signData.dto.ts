import { IsNotEmpty, IsString } from "class-validator";

export class SignDataDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}