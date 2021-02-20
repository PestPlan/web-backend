import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as constants from 'src/constants/constants';
import { DeviceDetailsDto } from 'src/models/dto/deviceDetails.dto';
import { DeviceListDto } from 'src/models/dto/deviceList.dto';
import { Device } from 'src/models/entities/device.entity';
import { HomeService } from 'src/modules/home/home.service';
import { PacketDocument } from 'src/models/schemas/packet.schema';

@Injectable()
export class DevicesService {
    constructor(
        @Inject(constants.DEVICE_PROVIDE) private deviceRepository: typeof Device,
        @Inject(constants.PACKET_PROVIDE) private pakcetModel: Model<PacketDocument>,
        private homeService: HomeService,
    ) {}

    /**
     * getDeviceList - 사용자의 기기 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getDeviceList(accessToken: string, page: number, row: number, regions: string[], locations: string[], models: string[]): Promise<DeviceListDto[]> {
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
            offset: row * (page -1),
            limit: row,
            order: [['created_at', 'DESC']],
        });
    }

    /**
     * getDeviceDetails - 기기의 세부 정보를 리턴한다.
     */
    async getDeviceDetails(deviceId: string): Promise<DeviceDetailsDto> {
        const deviceById = await this.deviceRepository.findOne({
            where: {
                trap_id: deviceId,
            },
        });

        const packetsByDeviceId = await await this.pakcetModel.find(
            {
                'SPU.MPU.trapId': deviceById.trap_id,
            },
            {},
            {
                sort: { 'SPU.MPU.time': -1 },
            },
        );

        return {
            device: deviceById,
            packets: packetsByDeviceId,
        };
    }
}
