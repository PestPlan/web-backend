import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { InfoDto } from 'src/models/dto/info.dto';
import { UserModelDto } from 'src/models/dto/userModel.dto';
import { User } from 'src/models/entities/user.entity';
import { Device } from 'src/models/entities/device.entity';
import { Notice } from 'src/models/entities/notice.entity';
import sequelize from 'sequelize';
import { DeviceInfoDto } from '../../models/dto/deviceInfo.dto';

@Injectable()
export class HomeService {
    constructor(
        @Inject('UserRepository') private userRepository: typeof User,
        @Inject('DeviceRepository') private deviceRepository: typeof Device,
        @Inject('NoticeRepository') private noticeRepository: typeof Notice,
        private authService: AuthService,
    ) {}

    private readonly ROW_CNT: number = 15;

    /**
     * getUser - 토큰에 저장된 사용자의 User model을 리턴한다.
     */
    async getUser(access_token: string): Promise<UserModelDto> {
        const tokenPayload = this.authService.decodeToken(access_token);
        // token에 저장된 id와 username이 존재하는지 확인한다.
        const { sub, username } = tokenPayload;
        const user = await this.userRepository.findOne({
            where: {
                id: sub,
                username,
            },
        });

        if (!user) {
            throw new NotFoundException('There has no username contained in the token you sent.');
        }
        return user;
    }

    /**
     * getDeviceIds - 사용자가 가지는 기기의 id 배열을 리턴한다.
     */
    async getDeviceIds(user_id: number): Promise<number[]> {
        const device_ids = await this.deviceRepository.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                user_id,
            },
        });
        return device_ids.map((device_id) => device_id.id);
    }

    /**
     * getUserInfo - 토큰에 저장된 사용자의 정보를 리턴한다.
     */
    async getUserInfo(access_token: string): Promise<InfoDto> {
        const user = await this.getUser(access_token);

        const device_ids = await this.getDeviceIds(user.id);

        const notice_cnt = await this.noticeRepository.count({
            include: [
                {
                    model: this.deviceRepository,
                },
            ],
            where: {
                device_id: device_ids,
            },
        });

        return {
            username: user.username,
            device_cnt: user.device_cnt,
            notice_cnt,
        };
    }

    /**
     * getNoticeInfo - 사용자의 알람 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getNoticeInfo(access_token: string, page: number) {
        const user = await this.getUser(access_token);

        const device_ids = await this.getDeviceIds(user.id);

        return await this.noticeRepository.findAll({
            include: [
                {
                    model: this.deviceRepository,
                    attributes: [],
                },
            ],
            attributes: [
                [sequelize.fn('date_format', sequelize.col('Notice.created_at'), '%Y-%m-%d %H:%i:%s'), 'created_at'],
                [sequelize.literal('device.region'), 'region'],
                [sequelize.literal('device.location'), 'location'],
                [sequelize.literal('device.model_name'), 'model_name'],
                'type',
            ],
            raw: true,
            where: {
                device_id: device_ids,
            },
            order: [['created_at', 'DESC']],
            offset: this.ROW_CNT * (page - 1),
            limit: this.ROW_CNT,
        });
    }

    /**
     * getDeviceInfo - 사용자의 기기 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getDeviceInfo(access_token: string, page: number): Promise<DeviceInfoDto[]> {
        const user = await this.getUser(access_token);

        return await this.deviceRepository.findAll({
            raw: true,
            attributes: ['id', 'region', 'location', 'model_name'],
            where: {
                user_id: user.id,
            },
            offset: this.ROW_CNT * (page - 1),
            limit: this.ROW_CNT,
        });
    }

    /**
     * getDeviceDetail - 기기의 세부 정보를 리턴한다.
     */
    async getDeviceDetail(device_id: number) {
        return await this.deviceRepository.findOne({
            where: {
                id: device_id,
            },
        });
    }
}
