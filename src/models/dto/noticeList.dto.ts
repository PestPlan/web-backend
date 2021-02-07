import { IsDate, IsString } from "class-validator";

export class NoticeListDto {
    @IsDate()
    created_at: Date;

    @IsString()
    type: string;

    @IsString()
    region: string;

    @IsString()
    location: string;

    @IsString()
    model_name: string;
}
