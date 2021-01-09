import { Device } from '../entities/device.entity';

export const devicesProviders = [
    {
        provide: 'DeviceRepository',
        useValue: Device,
    },
];
