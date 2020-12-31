import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDataDto } from 'src/login/dto/userData.dto';
import { tokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    /**
     * createToken - token을 생성한다.
     */
    createToken(userData: UserDataDto): tokenDto {
        const { id, username, device_cnt } = userData;
        const payload = {
            sub: id,
            username,
            device_cnt,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
