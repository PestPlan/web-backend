import { IsNumber, IsPositive, IsString } from "class-validator";

export class DeviceInfoDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    model_name: string;

    @IsString()
    region: string;

    @IsString()
    location: string;
}