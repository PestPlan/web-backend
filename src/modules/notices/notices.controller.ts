import { Body, Controller, Post } from '@nestjs/common';
import { NoticesService } from './notices.service';

@Controller('notices')
export class NoticesController {
    constructor(private readonly noticesService: NoticesService) {}

    @Post()
    updateDeviceStatus(@Body() deviceData) {
        this.noticesService.updateDeviceStatus(deviceData);
    }
}
