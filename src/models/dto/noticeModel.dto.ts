import { IsBoolean, IsDate, IsNumber, IsPositive } from "class-validator";

export class NoticeModelDto {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsNumber()
    @IsPositive()
    device_id: number;

    @IsBoolean()
    is_readed: boolean;

    @IsDate()
    created_at: Date;
}