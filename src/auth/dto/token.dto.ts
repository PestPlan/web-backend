import { IsNotEmpty, IsString } from "class-validator";

export class tokenDto {
    @IsString()
    @IsNotEmpty()
    readonly access_token: string;
}