import { ValidateNested } from "class-validator";
import { DeviceDocument } from "../schemas/device.schema";
import { NoticeDocument } from "../schemas/notice.schema";

export class DeviceDetailsDto {
    @ValidateNested()
    readonly device: DeviceDocument;

    @ValidateNested()
    readonly notices: NoticeDocument[];
}
