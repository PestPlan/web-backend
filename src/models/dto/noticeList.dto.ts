import { IsBoolean, IsDate, IsString, ValidateNested } from "class-validator";
import { SPUDocument } from "../schemas/SPU.schema";

export class NoticeListDto {
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
