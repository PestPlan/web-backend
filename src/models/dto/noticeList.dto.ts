import { IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { SPUDocument } from "../schemas/SPU.schema";

class NoticeList {
    @IsString()
    notice_id: string;

    @IsDate()
    created_at: Date;

    @IsString()
    region: string;

    @IsString()
    location: string;

    @IsString()
    model_name: string;

    @IsString()
    type: string;

    @IsBoolean()
    is_read: boolean;

    @ValidateNested()
    packet: SPUDocument;
}

export class NoticeListDto {
    @IsNumber()
    total_filtered_count: number;

    @IsNumber()
    total_not_read_count: number;

    @ValidateNested()
    notice_list: NoticeList[];
}
