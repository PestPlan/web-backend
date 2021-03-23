import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { AccessTokenDto } from '../../models/dto/accessToken.dto';
import { SignDataDto } from '../../models/dto/signData.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('signup')
    create(@Body() signUpData: SignDataDto) {
        this.loginService.create(signUpData);
    }

    @Post('signin')
    login(@Body() signInData: SignDataDto): Promise<AccessTokenDto> {
        return this.loginService.login(signInData);
    }
}
