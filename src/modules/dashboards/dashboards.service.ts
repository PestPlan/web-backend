import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Device } from 'src/models/entities/device.entity';
import { Packet } from '../../models/schemas/packet.schema';
import { HomeService } from '../home/home.service';

@Injectable()
export class DashboardsService {
    constructor(@Inject('DeviceRepository') private deviceRepository: typeof Device, @Inject('Packet') private packetModel: Model<Packet>, private homeService: HomeService) {}

    hexString2Int(str: string): number {
        const hexStr = '0x' + str;
        return parseInt(hexStr);
    }

    getLastYearRange(): { start_month: number; end_month: number } {
        const now = new Date();
        const year = now.getFullYear() % 100;
        const month = now.getMonth() + 1;
        const end_month = year * 100 + month + 1;
        const start_month = (year - 1) * 100 + month + 1;
        return { start_month, end_month };
    }

    initializeCaptures(start_month: number, end_month: number): object {
        const captures = {};
        for (let time = start_month; time < end_month; time++) {
            if (time % 100 === 13) time = time + 100 - 12;
            captures[time] = 0;
        }
        return captures;
    }

    async getPestCaptures(accessToken: string): Promise<object> {
        const { start_month, end_month } = this.getLastYearRange();
        let captures = this.initializeCaptures(start_month, end_month);
        const packets = await this.getLastYearPackets(accessToken, start_month, end_month);
        packets.filter((packet) => this.hexString2Int(packet.SPU.MPU.trapIdType) < 16).forEach((packet) => (captures[packet.SPU.MPU.time.slice(0, 4)] += Number(packet.SPU.MPU.pest.capture)));
        return { pest: captures };
    }

    async getMouseCaptures(accessToken: string): Promise<object> {
        const { start_month, end_month } = this.getLastYearRange();
        let captures = this.initializeCaptures(start_month, end_month);
        const packets = await this.getLastYearPackets(accessToken, start_month, end_month);
        packets.filter((packet) => this.hexString2Int(packet.SPU.MPU.trapIdType) >= 16).forEach((packet) => (captures[packet.SPU.MPU.time.slice(0, 4)] += Number(packet.SPU.MPU.mouseWarning.capture)));
        return { mouse: captures };
    }

    async getLastYearPackets(accessToken: string, start_month: number, end_month: number): Promise<Packet[]> {
        const user = await this.homeService.getUserByToken(accessToken);

        const devices = await this.deviceRepository.findAll({
            raw: true,
            attributes: ['trap_id'],
            where: {
                user_id: user.id,
            },
        });
        const trapIds = devices.map((device) => device.trap_id);

        const packets = await this.packetModel.find(
            {
                'SPU.MPU.trapId': trapIds,
                'SPU.MPU.time': {
                    $gte: start_month.toString(),
                    $lte: end_month.toString(),
                },
                'SPU.MPU.item': '4',
            },
            {
                _id: 0,
                'SPU.MPU.time': 1,
                'SPU.MPU.trapIdType': 1,
                'SPU.MPU.pest.capture': 1,
                'SPU.MPU.mouseWarning.capture': 1,
            },
        );

        return packets;
    }

    async getDevicesByRegion(accessToken: string): Promise<object> {
        const user = await this.homeService.getUserByToken(accessToken);

        const devices = await this.deviceRepository.findAll({
            raw: true,
            attributes: ['region'],
            where: {
                user_id: user.id,
            },
        });

        const devicesByRegion = {};
        devices
            .map((device) => device.region)
            .sort()
            .forEach((region) => (devicesByRegion[region] = devicesByRegion[region] ? devicesByRegion[region] + 1 : 1));
        return devicesByRegion;
    }

    async getDeviceStatus(accessToken: string) {
        const user = await this.homeService.getUserByToken(accessToken);

        const devices = await this.deviceRepository.findAll({
            raw: true,
            attributes: ['is_replacement', 'is_error'],
            where: {
                user_id: user.id,
            },
        });

        const deviceStatus = {
            normal: 0,
            replacement: 0,
            error: 0,
        };

        devices.filter((device) => {
            if (device.is_replacement) {
                deviceStatus.replacement++;
            } else if (device.is_error) {
                deviceStatus.error++;
            } else {
                deviceStatus.normal++;
            }
        });

        return deviceStatus;
    }
}
