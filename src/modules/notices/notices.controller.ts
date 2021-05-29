import { Body, Controller, Post } from '@nestjs/common';
import { NoticesService } from './notices.service';

@Controller('notices')
export class NoticesController {
    constructor(private readonly noticesService: NoticesService) {}

    @Post()
    updateDeviceStatus(@Body() deviceData) {
        if (deviceData.trapId == 1) {
            this.noticesService.updateDeviceReplacementStatus(deviceData);
        } else if (deviceData.trapId == 2) {
            this.noticesService.updateDeviceErrorStatus(deviceData);
        }
    }
}
