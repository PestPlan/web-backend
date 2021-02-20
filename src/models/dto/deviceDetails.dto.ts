import { ValidateNested } from "class-validator";
import { Device } from "../entities/device.entity";
import { PacketDocument } from "../schemas/packet.schema";

export class DeviceDetailsDto {
    @ValidateNested()
    readonly device: Device;

    @ValidateNested()
    readonly packets: PacketDocument[];
}
