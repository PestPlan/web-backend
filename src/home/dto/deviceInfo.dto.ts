import { IsNumber, IsPositive, IsString } from "class-validator";

export class DeviceInfoDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    region: string;

    @IsString()
    location: string;

    @IsString()
    model_name: string;
}