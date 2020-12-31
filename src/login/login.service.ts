import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignDataDto } from './dto/signData.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { UserDataDto } from './dto/userData.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}
    
    async create(signUpData: SignDataDto) {
        console.log(signUpData);
        const { username, password } = signUpData;

        // 같은 username이 존재하는지 확인한다.
        const isExist = await this.userModel.findOne({
            where: {
                username,
            }
        });
        if(isExist) {
            throw new NotFoundException('Same username is exist. And we should change this exception since this is not a NotFoundException!!!!');
        }

        // User에 데이터를 추가한다.
        const userCnt = await this.userModel.count();
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);
        await this.userModel.create({
            id: userCnt + 1,
            username: username,
            password: hashedPwd,
            salt: salt,
            device_cnt: 0,
        });
    }

    async login(signInData: SignDataDto): Promise<UserDataDto> {
        const { username, password } = signInData;

        // username이 존재하는지 확인한다.
        const user = await this.userModel.findOne({
            where: {
                username: username,
            },
        });
        if(!user) {
            throw new NotFoundException('There has no username!');
        }

        // password가 일치하는지 확인한다.
        const hashedPwd = await bcrypt.hash(password, user.salt);
        const isMatch = await bcrypt.compare(password, hashedPwd);
        if(!isMatch) {
            throw new NotFoundException('Invalid password!');
        }
        return user;
    }
}
