import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as constants from 'src/constants/constants';
import { DeviceDetailsDto } from 'src/models/dto/deviceDetails.dto';
import { DeviceListDto } from 'src/models/dto/deviceList.dto';
import { InfoDto } from 'src/models/dto/info.dto';
import { NewReadStatusDto } from 'src/models/dto/newReadStatus.dto';
import { NoticeListDto } from 'src/models/dto/noticeList.dto';
import { DeviceDocument } from 'src/models/schemas/device.schema';
import { NoticeDocument } from 'src/models/schemas/notice.schema';
import { UserDocument } from 'src/models/schemas/user.schema';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class HomeService {
    constructor(
        @Inject(constants.USER_MODEL) private userModel: Model<UserDocument>,
        @Inject(constants.DEVICE_MODEL) private deviceModel: Model<DeviceDocument>,
        @Inject(constants.NOTICE_MODEL) private noticeModel: Model<NoticeDocument>,
        private authService: AuthService,
    ) {}

    /**
     * getUserData - 토큰에 저장된 사용자의 User model을 리턴한다.
     */
    async getUserByToken(accessToken: string): Promise<UserDocument> {
        const { sub, username } = this.authService.decodeToken(accessToken);
        
        // token에 저장된 id와 username이 존재하는지 확인한다.
        const user = await this.userModel.findOne({
            _id: sub,
            username,
        });
        if (!user) {
            throw new NotFoundException('There has no username contained in the token you sent.');
        }

        return user;
    }

    /**
     * getUserInfo - 토큰에 저장된 사용자의 정보를 리턴한다.
     */
    async getUserName(accessToken: string): Promise<InfoDto> {
        const userData = await this.getUserByToken(accessToken);

        const deviceList = await this.deviceModel.find({ user_id: userData._id });
        const deviceIds = deviceList.map(deviceDocument => deviceDocument._id);

        const noticeCount = await this.noticeModel.countDocuments({ device_id: { $in: deviceIds } }, null);

        return {
            username: userData.username,
            device_cnt: deviceIds.length,
            notice_cnt: noticeCount,
        };
    }

    /**
     * getNoticeList - 사용자의 알람 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getNoticeList(accessToken: string, page: number, row: number, start: Date, end: Date, regions: string[], locations: string[], models: string[], types: string[]): Promise<NoticeListDto> {
        const userData = await this.getUserByToken(accessToken);

        const filteredDeviceList = await this.deviceModel.find(
            {
                user_id: userData._id,
                ...(regions && { region: { $in: regions } }),
                ...(locations && { location: { $in: locations } }),
                ...(models && { model_name: { $in: models } }),
            },
            {
                _id: 1,
                region: 1,
                location: 1,
                model_name: 1,
            }
        );
        const filteredDeviceIds = filteredDeviceList.map(deviceDocument => deviceDocument._id);

        const createdAtQuery = {};
        if(start.toString() !== "Invalid Date") createdAtQuery["$gte"] = start;
        if(end.toString() !== "Invalid Date") createdAtQuery["$lte"] = end;

        const filteredNoticeList = await this.noticeModel.find(
            {
                device_id: { $in: filteredDeviceIds },
                created_at: createdAtQuery,
                ...(types && { type: { $in: types } }),
            },
            {
                _id: 1,
                device_id: 1,
                created_at: 1,
                type: 1,
                is_read: 1,
                packet: 1,
            },
            {
                sort: { created_at: -1 },
            }
        );

        const limitedNoticeList = filteredNoticeList.slice(row * (page -1), row);

        return {
            total_filtered_count: filteredNoticeList.length,
            total_not_read_count: limitedNoticeList.filter(noticeData => noticeData.is_read === false).length,
            notice_list: limitedNoticeList.map(noticeData => {
                const deviceData = filteredDeviceList.find(data => data._id.toString() === noticeData.device_id);

                return {
                    notice_id: noticeData._id,
                    created_at: noticeData.created_at,
                    region: deviceData.region,
                    location: deviceData.location,
                    model_name: deviceData.model_name,
                    type: noticeData.type,
                    is_read: noticeData.is_read,
                    packet: noticeData.packet,
                };
            })
        }
    }

    /**
     * getDeviceList - 사용자의 기기 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getDeviceList(accessToken: string, page: number, row: number, regions: string[], locations: string[], models: string[]): Promise<DeviceListDto[]> {
        const userData = await this.getUserByToken(accessToken);

        return await this.deviceModel.find(
            {
                user_id: userData._id,
                ...(regions && { region: { $in: regions } }),
                ...(locations && { location: { $in: locations } }),
                ...(models && { model_name: { $in: models } }),
            },
            {
                _id: 0,
                trap_id: 1,
                region: 1,
                location: 1,
                model_name: 1,
            },
            {
                limit: row,
                skip: row * (page -1),
                sort: { created_at: -1 },
            }
        );
    }

    /**
     * getDeviceDetail - 기기의 세부 정보를 리턴한다.
     */
    async getDeviceDetail(deviceId: string): Promise<DeviceDetailsDto> {
        const deviceById = await this.deviceModel.findOne({ trap_id: deviceId });

        const noticesByDeviceId = await this.noticeModel.find({ device_id: deviceById._id });

        return {
            device: deviceById,
            notices: noticesByDeviceId,
        };
    }

    /**
     * updateNoticeReadStatus - notices collection에서 is_read 값을 false에서 true로 업데이트한다.
     */
    async updateNoticeReadStatus(noticeId: string, newReadStatus: NewReadStatusDto) {
        return await this.noticeModel.findByIdAndUpdate(noticeId, newReadStatus);
    }
}
