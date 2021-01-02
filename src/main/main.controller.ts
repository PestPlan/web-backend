import { Controller, Get, Query } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
    constructor(private readonly mainService: MainService) {}

    @Get('getUserInfo')
    getUserInfo(@Query('access_token') access_token: string) {
        return this.mainService.getUserInfo(access_token);
    }
}
