import { IsString } from "class-validator";

export class DeviceListDto {
    @IsString()
    readonly trap_id: string;

    @IsString()
    readonly region: string;

    @IsString()
    readonly location: string;

    @IsString()
    readonly model_name: string;
}