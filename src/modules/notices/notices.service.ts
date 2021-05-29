import { Inject, Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Device } from 'src/models/entities/device.entity';

@Injectable()
export class NoticesService {
    constructor(@Inject('DeviceRepository') private deviceRepository: typeof Device) {}

    async updateDeviceReplacementStatus(deviceData) {
        await this.deviceRepository.update(
            {
                is_replacement: true,
            },
            {
                where: {
                    trap_id: deviceData.trapId,
                },
            },
        );

        this.rollbackDeviceReplacementStatus(deviceData);
    }

    @Timeout(100000)
    async rollbackDeviceReplacementStatus(deviceData) {
        await this.deviceRepository.update(
            {
                is_replacement: false,
            },
            {
                where: {
                    trap_id: deviceData.trapId,
                },
            },
        );
    }

    async updateDeviceErrorStatus(deviceData) {
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

        this.rollbackDeviceErrorStatus(deviceData);
    }

    @Timeout(100000)
    async rollbackDeviceErrorStatus(deviceData) {
        await this.deviceRepository.update(
            {
                is_error: false,
            },
            {
                where: {
                    trap_id: deviceData.trapId,
                },
            },
        );
    }
}
