import { Controller, Get, Query } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';

@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) {}

    @Get('/records')
    getRecords(@Query('access_token') accessToken: string) {
        return this.dashboardsService.getRecords(accessToken);
    }

    @Get('/devices')
    getDevicesByRegion(@Query('access_token') accessToken: string): Promise<object> {
        return this.dashboardsService.getDevicesByRegion(accessToken);
    }
}
