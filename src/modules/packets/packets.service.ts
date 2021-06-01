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

    async getPacketCount(accessToken: string, start: Date, end: Date, regions: string[], locations: string[], models: string[], types: string[]) {
        const filteredDeviceList = await this.devicesService.getDeviceList(accessToken, regions, locations, models);
        const filteredTrapIds = filteredDeviceList.map((device) => device.trap_id);

        const timeQuery = {};
        if (start.toString() !== 'Invalid Date') {
            timeQuery['$gte'] = this.makeTwoDigits(start.getFullYear() % 100) + this.makeTwoDigits(start.getMonth() + 1) + this.makeTwoDigits(start.getDate()) + '0000';
        }
        if (end.toString() !== 'Invalid Date') {
            timeQuery['$lte'] = this.makeTwoDigits(end.getFullYear() % 100) + this.makeTwoDigits(end.getMonth() + 1) + this.makeTwoDigits(end.getDate()) + '9999';
        }

        const items = [];
        if (types === undefined || types.includes('주기')) items.push('5');
        if (types === undefined || types.includes('경보')) items.push('4');
        if (types === undefined || types.includes('에러')) items.push('6');

        const count = await this.packetModel.countDocuments({
            'SPU.MPU.trapId': filteredTrapIds,
            'SPU.MPU.time': timeQuery,
            'SPU.MPU.item': items,
        });

        return { count };
    }

    /**
     * getPacketList - 사용자의 알람 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getPacketList(accessToken: string, page: number, row: number, start: Date, end: Date, regions: string[], locations: string[], models: string[], types: string[]): Promise<PacketListDto> {
        const filteredDeviceList = await this.devicesService.getDeviceList(accessToken, regions, locations, models);
        const filteredTrapIds = filteredDeviceList.map((device) => device.trap_id);

        const now = new Date();
        const todayRegex = this.makeTwoDigits(now.getFullYear() % 100) + this.makeTwoDigits(now.getMonth() + 1) + this.makeTwoDigits(now.getDate());
        const today = await this.packetModel.countDocuments({
            'SPU.MPU.time': { $regex: `^${todayRegex}` },
        });

        const cycle = await this.packetModel.countDocuments({ 'SPU.MPU.item': '5' });
        const capture = await this.packetModel.countDocuments({ 'SPU.MPU.item': '4' });
        const error = await this.packetModel.countDocuments({ 'SPU.MPU.item': '6' });

        const timeQuery = {};
        if (start.toString() !== 'Invalid Date') {
            timeQuery['$gte'] = this.makeTwoDigits(start.getFullYear() % 100) + this.makeTwoDigits(start.getMonth() + 1) + start.toString().slice(8, 10) + '0000';
        }
        if (end.toString() !== 'Invalid Date') {
            timeQuery['$lte'] = this.makeTwoDigits(end.getFullYear() % 100) + this.makeTwoDigits(end.getMonth() + 1) + end.toString().slice(8, 10) + '9999';
        }

        const items = [];
        if (types === undefined || types.includes('주기')) items.push('5');
        if (types === undefined || types.includes('경보')) items.push('4');
        if (types === undefined || types.includes('에러')) items.push('6');

        const filteredPacketList = await this.packetModel.find(
            {
                'SPU.MPU.trapId': filteredTrapIds,
                'SPU.MPU.time': timeQuery,
                'SPU.MPU.item': items,
            },
            {
                _id: 1,
                is_read: 1,
                SPU: 1,
            },
            {
                sort: { 'SPU.MPU.time': -1 },
                skip: row * (page - 1),
                limit: row,
            },
        );

        return {
            info: { today, cycle, capture, error },
            list: filteredPacketList.map((packet) => {
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
                    type: MPU.item,
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
