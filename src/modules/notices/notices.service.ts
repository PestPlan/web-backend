import { Inject, Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Device } from 'src/models/entities/device.entity';

@Injectable()
export class NoticesService {
    constructor(@Inject('DeviceRepository') private deviceRepository: typeof Device) {}

    async updateDeviceStatus(deviceData) {
        await this.deviceRepository.update(
            {
                is_error: true,
            },
            {
                where: {
                    trap_id: deviceData.trapId,
                },
            },
        );

        this.rollbackDeviceStatus(deviceData);
    }

    @Timeout(100000)
    async rollbackDeviceStatus(deviceData) {
        await this.deviceRepository.update(
            {
                is_error: false,
            },
            {
                where: {
                    trap_id: deviceData.trap_id,
                },
            },
        );
    }
}
