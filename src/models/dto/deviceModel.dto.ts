import { IsBoolean, IsNumber, IsPositive, IsString } from "class-validator";

export class DeviceModelDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsNumber()
    @IsPositive()
    user_id: number;

    @IsString()
    model_name: string;

    @IsString()
    region: string;

    @IsString()
    location: string;

    @IsBoolean()
    is_replacement: boolean;

    @IsBoolean()
    is_error: boolean;
}