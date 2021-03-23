import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { InfoDto } from '../../models/dto/info.dto';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('user')
    getUserName(@Query('access_token') accessToken: string): Promise<InfoDto> {
        return this.homeService.getUserName(accessToken);
    }
}
