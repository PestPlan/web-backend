import { IsNotEmpty, IsString } from "class-validator";

export class AccessTokenDto {
    @IsString()
    @IsNotEmpty()
    readonly access_token: string;
}