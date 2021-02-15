import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { DeviceDetailsDto } from 'src/models/dto/deviceDetails.dto';
import { DeviceListDto } from 'src/models/dto/deviceList.dto';
import { InfoDto } from 'src/models/dto/info.dto';
import { NewReadStatusDto } from 'src/models/dto/newReadStatus.dto';
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
    ): Promise<NoticeListDto> {
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

    @Get('devices/details/:id')
    getDeviceDetail(@Param('id') deviceId: string): Promise<DeviceDetailsDto> {
        return this.homeService.getDeviceDetail(deviceId);
    }

    @Patch('notices/:id')
    updateNoticeReadStatus(@Param('id') noticeId: string, @Body('data') newReadStatus: NewReadStatusDto) {
        return this.homeService.updateNoticeReadStatus(noticeId, newReadStatus);
    }
}
