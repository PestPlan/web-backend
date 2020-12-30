import { Body, Controller, Header, Post } from '@nestjs/common';
import { SignDataDto } from './dto/signData.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('signup')
    create(@Body() signUpData: SignDataDto) {
        return this.loginService.create(signUpData);
    }

    @Post('signin')
    login(@Body() signInData: SignDataDto) {
        return this.loginService.login(signInData);
    }
}
