import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { DeviceDetailsDto } from 'src/models/dto/deviceDetails.dto';
import { DeviceListDto } from 'src/models/dto/deviceList.dto';
import { InfoDto } from 'src/models/dto/info.dto';
import { PacketListDto } from 'src/models/dto/packetList.dto';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('user')
    getUserName(@Query('access_token') accessToken: string): Promise<InfoDto> {
        return this.homeService.getUserName(accessToken);
    }

    @Get('notices')
    getPacketList(
        @Query('access_token') accessToken: string,
        @Query('page') page: number,
        @Query('row') row: number,
        @Query('start') start: Date,
        @Query('end') end: Date,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[],
        @Query('types') types: string[]
    ): Promise<PacketListDto> {
        return this.homeService.getPacketList(accessToken, page, row, start, end, regions, locations, models, types);
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
    getDeviceDetails(@Param('id') deviceId: string): Promise<DeviceDetailsDto> {
        return this.homeService.getDeviceDetails(deviceId);
    }

    @Patch('notices/read/:id')
    updatePacketReadStatus(@Param('id') packetId: string) {
        return this.homeService.updatePacketReadStatus(packetId);
    }
}
