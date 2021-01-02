import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { DeviceModelDto } from "src/models/dto/deviceModel.dto";
import { NoticeModelDto } from "src/models/dto/noticeModel.dto";

export class InfoDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    
    @IsNumber()
    @Min(0)
    readonly device_cnt: number;

    @ValidateNested()
    @Type(() => DeviceModelDto)
    readonly devices: DeviceModelDto[];

    @ValidateNested()
    @Type(() => NoticeModelDto)
    readonly notices: NoticeModelDto[];
}