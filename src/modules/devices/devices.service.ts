import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HomeService } from '../../modules/home/home.service';
import { DeviceDetailsDto } from '../../models/dto/deviceDetails.dto';
import { DeviceListDto } from '../../models/dto/deviceList.dto';
import { Device } from '../../models/entities/device.entity';
import { Packet } from '../../models/schemas/packet.schema';

@Injectable()
export class DevicesService {
    constructor(@Inject('DeviceRepository') private deviceRepository: typeof Device, @Inject('Packet') private packetModel: Model<Packet>, private homeService: HomeService) {}

    /**
     * getDeviceList - 사용자의 기기 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getDeviceList(accessToken: string, regions: string[], locations: string[], models: string[], page?: number, row?: number): Promise<DeviceListDto[]> {
        const user = await this.homeService.getUserByToken(accessToken);

        return await this.deviceRepository.findAll({
            raw: true,
            attributes: ['trap_id', 'region', 'location', 'model_name'],
            where: {
                user_id: user.id,
                ...(regions && { region: regions }),
                ...(locations && { location: locations }),
                ...(models && { model_name: models }),
            },
            ...(row !== undefined && {
                offset: row * (page - 1),
                limit: row,
            }),
            order: [['created_at', 'DESC']],
        });
    }

    async getDeviceInfos(accessToken: string) {
        const user = await this.homeService.getUserByToken(accessToken);

        const devices = await this.deviceRepository.findAll({
            raw: true,
            attributes: ['trap_id', 'is_error'],
            where: {
                user_id: user.id,
            },
        });

        return {
            total: devices.length,
            pest: devices.filter((device) => device.trap_id[0] === '0').length,
            mouse: devices.filter((device) => device.trap_id[0] === '1').length,
            error: devices.filter((device) => device.is_error === true).length,
        };
    }

    /**
     * getDeviceDetails - 기기의 세부 정보를 리턴한다.
     */
    async getDeviceDetails(deviceId: string, page: number, row: number): Promise<DeviceDetailsDto> {
        const deviceById = await this.deviceRepository.findOne({
            where: {
                trap_id: deviceId,
            },
        });

        const packetsByDeviceId = await await this.packetModel.find(
            {
                'SPU.MPU.trapId': deviceById.trap_id,
            },
            {},
            {
                sort: { 'SPU.MPU.time': -1 },
            },
        );

        const packets = packetsByDeviceId.slice(row * (page - 1), row * page);

        return {
            device: deviceById,
            packets,
            packetCount: packetsByDeviceId.length,
        };
    }
}
