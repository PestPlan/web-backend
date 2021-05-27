import { Controller, Get, Query } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';

@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) {}

    @Get('/captures/pest')
    getPestCaptures(@Query('access_token') accessToken: string) {
        return this.dashboardsService.getPestCaptures(accessToken);
    }

    @Get('/captures/mouse')
    getMouseCaptures(@Query('access_token') accessToken: string) {
        return this.dashboardsService.getMouseCaptures(accessToken);
    }

    @Get('/devices')
    getDevicesByRegion(@Query('access_token') accessToken: string): Promise<object> {
        return this.dashboardsService.getDevicesByRegion(accessToken);
    }

    @Get('/devices/status')
    getDeviceStatus(@Query('access_token') accessToken: string) {
        return this.dashboardsService.getDeviceStatus(accessToken);
    }
}
