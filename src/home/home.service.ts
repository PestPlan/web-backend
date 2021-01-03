import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/models/user.model';
import { InfoDto } from 'src/home/dto/info.dto';
import { UserModelDto } from 'src/models/dto/userModel.dto';
import { Device } from 'src/models/device.model';
import { Notice } from 'src/models/notice.model';
import { DeviceInfoDto } from './dto/deviceInfo.dto';

@Injectable()
export class HomeService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        @InjectModel(Device)
        private deviceModel: typeof Device,
        @InjectModel(Notice)
        private noticeModel: typeof Notice,
        private authService: AuthService
    ) {}

    /**
     * getUser - 토큰에 저장된 사용자의 User model을 리턴한다.
     */
    async getUser(access_token: string): Promise<UserModelDto> {
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
        return user;
    }

    /**
     * getDevices - Devices table에서 user_id가 일치하는 모든 Device model을 리턴한다.
     */
    async getDevices(user_id: number): Promise<DeviceInfoDto[]> {
        return await this.deviceModel.findAll({
            raw: true,
            attributes: ['id', 'region', 'location', 'model_name'],
            where: {
                user_id,
            }
        });
    }

    /**
     * getNotices - Notices table에서 device_id가 일치하는 모든 Notice model을 리턴한다.
     */
    async getNotices(device_id: number[]) {
        return await this.noticeModel.findAll({
            raw: true,
            where: {
                device_id
            }
        });
    }

    /**
     * getUserInfo - 토큰에 저장된 사용자의 정보를 리턴한다.
     */
    async getInfo(access_token: string): Promise<InfoDto> {
        const user = await this.getUser(access_token);

        const devices = await this.getDevices(user.id);
        
        const device_ids = devices.map(device => device.id);
        const notices = await this.getNotices(device_ids);

        return {
            username: user.username,
            device_cnt: user.device_cnt,
            devices,
            notices,
        };
    }
}