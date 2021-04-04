import { Controller, Get, Query } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';

@Controller('dashboards')
export class DashboardsController {
    constructor(private readonly dashboardsService: DashboardsService) {}

    @Get('/records')
    getLastYearRecords(@Query('access_token') accessToken: string): Promise<number[]> {
        return this.dashboardsService.getLastYearRecords(accessToken);
    }

    @Get('/devices')
    getDevicesByRegion(@Query('access_token') accessToken: string): Promise<object> {
        return this.dashboardsService.getDevicesByRegion(accessToken);
    }
}
