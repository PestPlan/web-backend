import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { PacketsService } from './packets.service';
import { PacketListDto } from '../../models/dto/packetList.dto';

@Controller('packets')
export class PacketsController {
    constructor(private readonly packetsService: PacketsService) {}

    @Get()
    getPacketList(
        @Query('access_token') accessToken: string,
        @Query('page') page: number,
        @Query('row') row: number,
        @Query('start') start: Date,
        @Query('end') end: Date,
        @Query('regions') regions: string[],
        @Query('locations') locations: string[],
        @Query('models') models: string[],
        @Query('types') types: string[],
    ): Promise<PacketListDto> {
        return this.packetsService.getPacketList(accessToken, page, row, start, end, regions, locations, models, types);
    }

    @Patch('/:id')
    updatePacketReadStatus(@Param('id') packetId: string) {
        return this.packetsService.updatePacketReadStatus(packetId);
    }
}
