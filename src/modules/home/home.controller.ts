import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('user')
    getInfo(@Query('access_token') access_token: string) {
        return this.homeService.getUserInfo(access_token);
    }

    @Get('notices')
    getNoticeInfo(
        @Query('access_token') access_token: string,
        @Query('page') page: number,
        @Query('start') start: Date,
        @Query('end') end: Date,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[],
        @Query('types') types: string[]
    ) {
        return this.homeService.getNoticeInfo(access_token, page, start, end, regions, locations, models, types);
    }

    @Get('devices')
    getDeviceInfo(@Query('access_token') access_token: string, @Query('page') page: number) {
        return this.homeService.getDeviceInfo(access_token, page);
    }

    @Get('detail')
    getDeviceDetail(@Query('device_id') device_id: number) {
        return this.homeService.getDeviceDetail(device_id);
    }
}
