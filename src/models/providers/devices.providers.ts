import { Device } from '../entitys/device.entity';

export const devicesProviders = [
    {
        provide: 'DeviceRepository',
        useValue: Device,
    },
];
