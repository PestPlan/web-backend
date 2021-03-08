import { IsNumber, ValidateNested } from "class-validator";
import { Device } from "../entities/device.entity";
import { Packet } from "../schemas/packet.schema";

export class DeviceDetailsDto {
    @ValidateNested()
    readonly device: Device;

    @ValidateNested()
    readonly packets: Packet[];

    @IsNumber()
    readonly packetCount: number;
}
