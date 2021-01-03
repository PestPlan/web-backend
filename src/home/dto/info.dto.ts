import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { NoticeModelDto } from "src/models/dto/noticeModel.dto";
import { DeviceInfoDto } from "./deviceInfo.dto";

export class InfoDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    
    @IsNumber()
    @Min(0)
    readonly device_cnt: number;

    @ValidateNested()
    @Type(() => DeviceInfoDto)
    readonly devices: DeviceInfoDto[];

    @ValidateNested()
    @Type(() => NoticeModelDto)
    readonly notices: NoticeModelDto[];
}