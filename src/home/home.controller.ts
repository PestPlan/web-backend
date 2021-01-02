import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('getInfo')
    getInfo(@Query('access_token') access_token: string) {
        return this.homeService.getInfo(access_token);
    }
}
