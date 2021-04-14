import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Device } from 'src/models/entities/device.entity';
import { Packet } from '../../models/schemas/packet.schema';
import { HomeService } from '../home/home.service';

@Injectable()
export class DashboardsService {
    constructor(@Inject('DeviceRepository') private deviceRepository: typeof Device, @Inject('Packet') private packetModel: Model<Packet>, private homeService: HomeService) {}

    getRecordsByTrapType(packets: Packet[], isPest: boolean, start_month: number, end_month: number): object {
        const RecordsByItem = {};
        for (let time = start_month; time <= end_month; ) {
            RecordsByItem[time] = 0;

            time += 1;
            if (time % 100 === 13) {
                time += 100;
                time -= 12;
            }
        }

        packets
            .filter((packet) => (isPest ? packet.SPU.MPU.trapIdType < '16' : packet.SPU.MPU.trapIdType >= '16'))
            .map((packet) => packet.SPU.MPU.time.slice(0, 4))
            .forEach((time) => (RecordsByItem[time] = RecordsByItem[time] + 1));

        return RecordsByItem;
    }

    async getRecords(accessToken: string) {
        const user = await this.homeService.getUserByToken(accessToken);

        const devices = await this.deviceRepository.findAll({
            raw: true,
            attributes: ['trap_id'],
            where: {
                user_id: user.id,
            },
        });
        const trapIds = devices.map((device) => parseInt(device.trap_id));

        const now = new Date();
        const year = now.getFullYear() % 100;
        const month = now.getMonth() + 1;
        const this_month = year * 100 + month;
        const start_month = (year - 1) * 100 + month + 1;

        const packets = await this.packetModel.find(
            {
                'SPU.MPU.trapId': trapIds,
                'SPU.MPU.time': {
                    $gte: start_month.toString(),
                    $lte: this_month.toString(),
                },
                'SPU.MPU.item': '4',
            },
            {
                _id: 0,
                'SPU.MPU.time': 1,
                'SPU.MPU.trapIdType': 1,
            },
        );

        const pest = this.getRecordsByTrapType(packets, true, start_month, this_month);
        const mouse = this.getRecordsByTrapType(packets, false, start_month, this_month);

        return { pest, mouse };
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
