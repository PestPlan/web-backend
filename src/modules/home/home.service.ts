import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { InfoDto } from 'src/models/dto/info.dto';
import { UserModelDto } from 'src/models/dto/userModel.dto';
import { User } from 'src/models/entities/user.entity';
import { Device } from 'src/models/entities/device.entity';
import { Notice } from 'src/models/entities/notice.entity';
import sequelize from 'sequelize';
import { DeviceInfoDto } from '../../models/dto/deviceInfo.dto';
import { Op } from 'sequelize';

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
    async getNoticeInfo(access_token: string, page: number, start: Date, end: Date, regions: string[], locations: string[], models: string[], types: string[]) {
        const user = await this.getUser(access_token);

        const device_ids = await this.getDeviceIds(user.id);

        let deviceWhereQuery: any = {};
        if(regions) deviceWhereQuery.region = regions;
        if(locations) deviceWhereQuery.location = locations;
        if(models) deviceWhereQuery.model_name = models;

        let noticeWhereQuery: any = { device_id: device_ids };
        if(start) noticeWhereQuery.created_at = { [Op.gte]: start };
        if(end) noticeWhereQuery.created_at = {
            ...noticeWhereQuery.created_at,
            [Op.lte]: end,
        };
        if(types) noticeWhereQuery.type = types;

        return await this.noticeRepository.findAll({
            include: [
                {
                    model: this.deviceRepository,
                    attributes: [],
                    where: deviceWhereQuery,
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
            where: noticeWhereQuery,
            order: [['created_at', 'DESC']],
            offset: this.ROW_CNT * (page - 1),
            limit: this.ROW_CNT,
        });
    }

    /**
     * getDeviceInfo - 사용자의 기기 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getDeviceInfo(access_token: string, page: number, regions: string[], locations: string[], models: string[]): Promise<DeviceInfoDto[]> {
        const user = await this.getUser(access_token);

        let where: any = {
            user_id: user.id
        };
        if(regions) where.region = regions;
        if(locations) where.location = locations;
        if(models) where.model_name = models;

        return await this.deviceRepository.findAll({
            raw: true,
            attributes: ['id', 'region', 'location', 'model_name'],
            where,
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
