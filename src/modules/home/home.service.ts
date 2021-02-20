import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as constants from 'src/constants/constants';
import { DeviceDetailsDto } from 'src/models/dto/deviceDetails.dto';
import { DeviceListDto } from 'src/models/dto/deviceList.dto';
import { InfoDto } from 'src/models/dto/info.dto';
import { PacketListDto } from 'src/models/dto/packetList.dto';
import { UserDto } from 'src/models/dto/user.dto';
import { Device } from 'src/models/entities/device.entity';
import { User } from 'src/models/entities/user.entity';
import { PacketDocument } from 'src/models/schemas/packet.schema';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class HomeService {
    constructor(
        @Inject(constants.USER_PROVIDE) private userRepository: typeof User,
        @Inject(constants.DEVICE_PROVIDE) private deviceRepository: typeof Device,
        @Inject(constants.PACKET_PROVIDE) private pakcetModel: Model<PacketDocument>,
        private authService: AuthService,
    ) {}

    /**
     * getUserByToken - 토큰에 저장된 사용자의 User model을 리턴한다.
     */
    async getUserByToken(accessToken: string): Promise<UserDto> {
        const { sub, username } = this.authService.decodeToken(accessToken);
        
        // token에 저장된 id와 username이 존재하는지 확인한다.
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
     * getUserName - 토큰에 저장된 사용자의 정보를 리턴한다.
     */
    async getUserName(accessToken: string): Promise<InfoDto> {
        const user = await this.getUserByToken(accessToken);

        const deviceList = await this.deviceRepository.findAll({
            raw: true,
            attributes: ['id'],
            where: {
                user_id: user.id,
            },
        });
        const trapIds = deviceList.map(device => device.trap_id);

        const packetCount = await this.pakcetModel.countDocuments({ 'SPU.MPU.trapId': trapIds });

        return {
            username: user.username,
            device_cnt: trapIds.length,
            packet_cnt: packetCount,
        };
    }

    /**
     * getPacketList - 사용자의 알람 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getPacketList(accessToken: string, page: number, row: number, start: Date, end: Date, regions: string[], locations: string[], models: string[], types: string[]): Promise<PacketListDto> {
        const filteredDeviceList = await this.getDeviceList(accessToken, page, row, regions, locations, models);
        const filteredTrapIds = filteredDeviceList.map(device => device.trap_id);
        
        const timeQuery = {};
        if(start.toString() !== "Invalid Date") timeQuery["$gte"] = start;
        if(end.toString() !== "Invalid Date") timeQuery["$lte"] = end;

        const filteredPacketList = await this.pakcetModel.find(
            {
                'SPU.MPU.trapId': filteredTrapIds,
                'SPU.MPU.time': timeQuery,
            },
            {
                _id: 1,
                is_read: 1,
                SPU: 1,
            },
            {
                sort: { 'SPU.MPU.time': -1 },
            }
        );
        // ...(types && { type: { $in: types } }),

        const limitedPacketList = filteredPacketList.slice(row * (page -1), row);

        return {
            total_filtered_count: filteredPacketList.length,
            total_not_read_count: limitedPacketList.filter(packet => !packet.is_read).length,
            packet_list: limitedPacketList.map(packet => {
                const { SPU: { MPU } } = packet;
                const device = filteredDeviceList.find(device => device.trap_id === MPU.trapId);

                return {
                    packet_id: packet._id,
                    created_at: MPU.time,
                    region: device.region,
                    location: device.location,
                    model_name: device.model_name,
                    type: MPU.dataType,
                    is_read: packet.is_read,
                    packet: packet.SPU,
                };
            })
        }
    }

    /**
     * getDeviceList - 사용자의 기기 정보 중 page에 해당하는 부분을 리턴한다.
     */
    async getDeviceList(accessToken: string, page: number, row: number, regions: string[], locations: string[], models: string[]): Promise<DeviceListDto[]> {
        const user = await this.getUserByToken(accessToken);

        return await this.deviceRepository.findAll({
            raw: true,
            attributes: ['trap_id', 'region', 'location', 'model_name'],
            where: {
                user_id: user.id,
                ...(regions && { region: regions }),
                ...(locations && { location: locations }),
                ...(models && { model_name: models }),
            },
            offset: row * (page -1),
            limit: row,
            order: [['created_at', 'DESC']],
        });
    }

    /**
     * getDeviceDetails - 기기의 세부 정보를 리턴한다.
     */
    async getDeviceDetails(deviceId: string): Promise<DeviceDetailsDto> {
        const deviceById = await this.deviceRepository.findOne({
            where: {
                trap_id: deviceId,
            },
        });

        const packetsByDeviceId = await this.pakcetModel.find(
            {
                device_id: deviceById.id,
            },
            { },
            {
                sort: { created_at: -1 },
            }
        );

        return {
            device: deviceById,
            packets: packetsByDeviceId,
        };
    }

    /**
     * updatePacketReadStatus - packets collection에서 is_read 값을 false에서 true로 업데이트한다.
     */
    async updatePacketReadStatus(packetId: string) {
        return await this.pakcetModel.findByIdAndUpdate(packetId, { is_read: true });
    }
}
