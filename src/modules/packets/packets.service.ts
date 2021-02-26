import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as constants from 'src/constants/constants';
import { PacketListDto } from 'src/models/dto/packetList.dto';
import { PacketDocument } from 'src/models/schemas/packet.schema';
import { DevicesService } from 'src/modules/devices/devices.service';

@Injectable()
export class PacketsService {
    constructor(
        @Inject(constants.PACKET_PROVIDE) private pakcetModel: Model<PacketDocument>,
        private devicesService: DevicesService,
    ) {}

    /**
     * getPacketList - 사용자의 알람 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getPacketList(accessToken: string, page: number, row: number, start: Date, end: Date, regions: string[], locations: string[], models: string[], types: string[]): Promise<PacketListDto> {
        const filteredDeviceList = await this.devicesService.getDeviceList(accessToken, page, row, regions, locations, models);
        const filteredTrapIds = filteredDeviceList.map(device => device.trap_id);
        
        const timeQuery = {};
        if(start.toString() !== "Invalid Date") timeQuery["$gte"] = start;
        if(end.toString() !== "Invalid Date") timeQuery["$lte"] = end;

        const filteredPacketList = await this.pakcetModel.find(
            {
                'SPU.MPU.trapId': filteredTrapIds,
                'SPU.MPU.time': timeQuery,
            },
            {
                _id: 1,
                is_read: 1,
                SPU: 1,
            },
            {
                sort: { 'SPU.MPU.time': -1 },
            }
        );
        // ...(types && { type: { $in: types } }),

        const limitedPacketList = filteredPacketList.slice(row * (page -1), row);

        return {
            total_filtered_count: filteredPacketList.length,
            total_not_read_count: limitedPacketList.filter(packet => !packet.is_read).length,
            packet_list: limitedPacketList.map(packet => {
                const { SPU: { MPU } } = packet;
                const device = filteredDeviceList.find(device => device.trap_id === MPU.trapId);

                return {
                    packet_id: packet._id,
                    created_at: MPU.time,
                    region: device.region,
                    location: device.location,
                    model_name: device.model_name,
                    type: MPU.dataType,
                    is_read: packet.is_read,
                    packet: packet.SPU,
                };
            })
        }
    }

    /**
     * updatePacketReadStatus - packets collection에서 is_read 값을 false에서 true로 업데이트한다.
     */
    async updatePacketReadStatus(packetId: string) {
        return await this.pakcetModel.findByIdAndUpdate(packetId, { is_read: true });
    }
}
