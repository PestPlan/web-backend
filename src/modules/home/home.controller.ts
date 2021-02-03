import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('user')
    getUserName(@Query('access_token') accessToken: string) {
        return this.homeService.getUserName(accessToken);
    }

    @Get('notices')
    getNoticeInfo(
        @Query('access_token') accessToken: string,
        @Query('page') page: number,
        @Query('start') start: Date,
        @Query('end') end: Date,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[],
        @Query('types') types: string[]
    ) {
        return this.homeService.getNoticeInfo(accessToken, page, start, end, regions, locations, models, types);
    }

    @Get('devices')
    getDeviceInfo(
        @Query('access_token') accessToken: string,
        @Query('page') page: number,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[]
    ) {
        return this.homeService.getDeviceInfo(accessToken, page, regions, locations, models);
    }

    @Get('detail')
    getDeviceDetail(@Query('device_id') deviceId: number) {
        return this.homeService.getDeviceDetail(deviceId);
    }
}
