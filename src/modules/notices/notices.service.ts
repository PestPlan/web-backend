import { Inject, Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { Device } from '../../models/entities/device.entity';

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

        setTimeout(
            async (deviceData) =>
                await this.deviceRepository.update(
                    {
                        is_replacement: false,
                    },
                    {
                        where: {
                            trap_id: deviceData.trapId,
                        },
                    },
                ),
            100000,
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

        setTimeout(
            async (deviceData) =>
                await this.deviceRepository.update(
                    {
                        is_error: false,
                    },
                    {
                        where: {
                            trap_id: deviceData.trapId,
                        },
                    },
                ),
            100000,
        );
    }
}
