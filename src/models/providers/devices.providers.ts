import { DEVICE_PROVIDE } from 'src/constants/constants';
import { Device } from '../entities/device.entity';

export const devicesProviders = [
    {
        provide: DEVICE_PROVIDE,
        useValue: Device,
    },
];
