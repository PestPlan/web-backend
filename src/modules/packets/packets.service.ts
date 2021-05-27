import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PacketListDto } from '../../models/dto/packetList.dto';
import { Packet } from '../../models/schemas/packet.schema';
import { DevicesService } from '../../modules/devices/devices.service';

@Injectable()
export class PacketsService {
    constructor(@Inject('Packet') private packetModel: Model<Packet>, private devicesService: DevicesService) {}

    makeTwoDigits(number: number): string {
        return ('0' + number).slice(-2);
    }

    /**
     * getPacketList - 사용자의 알람 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getPacketList(accessToken: string, page: number, row: number, start: Date, end: Date, regions: string[], locations: string[], models: string[], types: string[]): Promise<PacketListDto> {
        const filteredDeviceList = await this.devicesService.getDeviceList(accessToken, regions, locations, models);
        const filteredTrapIds = filteredDeviceList.map((device) => device.trap_id);

        const now = new Date();
        const today = this.makeTwoDigits(now.getFullYear() % 100) + this.makeTwoDigits(now.getMonth() + 1) + this.makeTwoDigits(now.getDate());
        const todayPacketList = await this.packetModel.find({
            'SPU.MPU.time': { $regex: `^${today}` },
        });

        const timeQuery = {};
        if (start.toString() !== 'Invalid Date') timeQuery['$gte'] = start;
        if (end.toString() !== 'Invalid Date') timeQuery['$lte'] = end;

        const filteredPacketList = await this.packetModel.find(
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
            },
        );
        // ...(types && { type: { $in: types } }),

        const limitedPacketList = filteredPacketList.slice(row * (page - 1), row * page);

        return {
            info: {
                total: filteredPacketList.length,
                unread: filteredPacketList.filter((packet) => !packet.is_read).length,
                error: filteredPacketList.filter((packet) => packet.SPU.MPU.item === '4').length,
                today: todayPacketList.length,
            },
            list: limitedPacketList.map((packet) => {
                const {
                    SPU: { MPU },
                } = packet;
                const device = filteredDeviceList.find((device) => device.trap_id === MPU.trapId);

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
            }),
        };
    }

    /**
     * updatePacketReadStatus - packets collection에서 is_read 값을 false에서 true로 업데이트한다.
     */
    async updatePacketReadStatus(packetId: string) {
        return await this.packetModel.findByIdAndUpdate(packetId, { is_read: true });
    }
}
