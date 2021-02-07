import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { DeviceListDto } from 'src/models/dto/deviceList.dto';
import { InfoDto } from 'src/models/dto/info.dto';
import { NoticeListDto } from 'src/models/dto/noticeList.dto';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('user')
    getUserName(@Query('access_token') accessToken: string): Promise<InfoDto> {
        return this.homeService.getUserName(accessToken);
    }

    @Get('notices')
    getNoticeList(
        @Query('access_token') accessToken: string,
        @Query('page') page: number,
        @Query('row') row: number,
        @Query('start') start: Date,
        @Query('end') end: Date,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[],
        @Query('types') types: string[]
    ): Promise<NoticeListDto[]> {
        return this.homeService.getNoticeList(accessToken, page, row, start, end, regions, locations, models, types);
    }

    @Get('devices')
    getDeviceList(
        @Query('access_token') accessToken: string,
        @Query('page') page: number,
        @Query('row') row: number,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[]
    ): Promise<DeviceListDto[]> {
        return this.homeService.getDeviceList(accessToken, page, row, regions, locations, models);
    }

    @Get('detail')
    getDeviceDetail(@Query('device_id') deviceId: number) {
        // return this.homeService.getDeviceDetail(deviceId);
    }
}
