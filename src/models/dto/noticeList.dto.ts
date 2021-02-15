import { IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { SPUDocument } from "../schemas/SPU.schema";

class NoticeList {
    @IsString()
    readonly notice_id: string;

    @IsDate()
    readonly created_at: Date;

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
    readonly packet: SPUDocument;
}

export class NoticeListDto {
    @IsNumber()
    readonly total_filtered_count: number;

    @IsNumber()
    readonly total_not_read_count: number;

    @ValidateNested()
    readonly notice_list: NoticeList[];
}
