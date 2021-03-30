import { IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { SPU } from "../schemas/SPU.schema";

class PacketInfo {
    @IsNumber()
    readonly total: number;

    @IsNumber()
    readonly unread: number;

    @IsNumber()
    readonly error: number;

    @IsNumber()
    readonly today: number;
}

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
    @ValidateNested()
    readonly info: PacketInfo;

    @ValidateNested()
    readonly list: PacketList[];
}
