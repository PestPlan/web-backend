import { Body, Controller, Post } from '@nestjs/common';
import { NoticesService } from './notices.service';

@Controller('notices')
export class NoticesController {
    constructor(private readonly noticesService: NoticesService) {}

    @Post()
    updateDeviceStatus(@Body() deviceData) {
        if (deviceData.item === '4') {
            this.noticesService.updateDeviceReplacementStatus(deviceData);
        } else if (deviceData.item === '6') {
            this.noticesService.updateDeviceErrorStatus(deviceData);
        }
    }
}
