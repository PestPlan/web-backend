import { IsBoolean, IsDate, IsString } from "class-validator";

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

    @IsString()
    packet: string;
}
