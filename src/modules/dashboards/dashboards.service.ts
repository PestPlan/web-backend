import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Device } from 'src/models/entities/device.entity';
import { Packet } from '../../models/schemas/packet.schema';
import { HomeService } from '../home/home.service';

@Injectable()
export class DashboardsService {
    constructor(@Inject('DeviceRepository') private deviceRepository: typeof Device, @Inject('Packet') private packetModel: Model<Packet>, private homeService: HomeService) {}

    async getLastYearRecords(accessToken: string): Promise<number[]> {
        return [1, 2, 3, 4, 5];
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
}
