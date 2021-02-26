import { IsNumber, IsString } from "class-validator";

export class DeviceListDto {
    @IsNumber()
    readonly trap_id: string;

    @IsString()
    readonly region: string;

    @IsString()
    readonly location: string;

    @IsString()
    readonly model_name: string;
}