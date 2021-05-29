import { Body, Controller, Post } from '@nestjs/common';
import { NoticesService } from './notices.service';

@Controller('notices')
export class NoticesController {
    constructor(private readonly noticesService: NoticesService) {}

    @Post()
    updateDeviceStatus(@Body() deviceData) {
        if (deviceData.cmd === '1') {
            this.noticesService.updateDeviceReplacementStatus(deviceData);
        } else if (deviceData.cmd === '2') {
            this.noticesService.updateDeviceErrorStatus(deviceData);
        }
    }
}
