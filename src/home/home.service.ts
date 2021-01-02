import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/login/model/user.model';
import { UserInfoDto } from 'src/home/dto/userInfo.dto';

@Injectable()
export class HomeService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private authService: AuthService
    ) {}

    /**
     * getUserInfo - 토큰에 저장된 사용자의 username과 device_cnt를 리턴한다.
     */
    async getUserInfo(access_token: string): Promise<UserInfoDto> {
        const tokenPayload = this.authService.decodeToken(access_token);
        
        // token에 저장된 id와 username이 존재하는지 확인한다.
        const { sub, username } = tokenPayload;
        const user = await this.userModel.findOne({
            where: {
                id: sub,
                username,
            }
        });
        if(!user) {
            throw new NotFoundException('There has no username contained in the token you sent.');
        }

        return { 
            username: user.username,
            device_cnt: user.device_cnt,
        };
    }
}