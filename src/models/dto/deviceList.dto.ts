import { IsString } from "class-validator";

export class DeviceListDto {
    @IsString()
    trap_id: string;

    @IsString()
    region: string;

    @IsString()
    location: string;

    @IsString()
    model_name: string;
}