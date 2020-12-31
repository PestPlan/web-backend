import { Body, Controller, Post } from '@nestjs/common';
import { SignDataDto } from './dto/signData.dto';
import { UserDataDto } from './dto/userData.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('signup')
    create(@Body() signUpData: SignDataDto) {
        return this.loginService.create(signUpData);
    }

    @Post('signin')
    login(@Body() signInData: SignDataDto): Promise<UserDataDto> {
        return this.loginService.login(signInData);
    }
}
