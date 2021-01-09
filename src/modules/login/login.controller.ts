import { Body, Controller, Post } from '@nestjs/common';
import { AccessTokenDto } from 'src//models/dto/accessToken.dto';
import { SignDataDto } from '../../models/dto/signData.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('signup')
    create(@Body() signUpData: SignDataDto) {
        return this.loginService.create(signUpData);
    }

    @Post('signin')
    login(@Body() signInData: SignDataDto): Promise<AccessTokenDto> {
        return this.loginService.login(signInData);
    }
}
