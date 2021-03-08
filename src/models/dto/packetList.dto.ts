import { IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { SPU } from "../schemas/SPU.schema";

class PacketList {
    @IsString()
    readonly packet_id: string;

    @IsDate()
    readonly created_at: string;

    @IsString()
    readonly region: string;

    @IsString()
    readonly location: string;

    @IsString()
    readonly model_name: string;

    @IsString()
    readonly type: string;

    @IsBoolean()
    readonly is_read: boolean;

    @ValidateNested()
    readonly packet: SPU;
}

export class PacketListDto {
    @IsNumber()
    readonly total_filtered_count: number;

    @IsNumber()
    readonly total_not_read_count: number;

    @ValidateNested()
    readonly packet_list: PacketList[];
}
