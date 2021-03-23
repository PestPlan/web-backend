import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InfoDto } from '../../models/dto/info.dto';
import { UserDto } from '../../models/dto/user.dto';
import { Device } from '../../models/entities/device.entity';
import { User } from '../../models/entities/user.entity';
import { Packet } from '../../models/schemas/packet.schema';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class HomeService {
    constructor(
        @Inject('UserRepository') private userRepository: typeof User,
        @Inject('DeviceRepository') private deviceRepository: typeof Device,
        @Inject('Packet') private packetModel: Model<Packet>,
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
            where: {
                user_id: user.id,
            },
        });
        const trapIds = deviceList.map((device) => device.trap_id);

        const packetCount = await this.packetModel.countDocuments({ 'SPU.MPU.trapId': trapIds });

        return {
            username: user.username,
            device_cnt: trapIds.length,
            packet_cnt: packetCount,
        };
    }
}
