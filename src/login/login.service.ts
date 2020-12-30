import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignDataDto } from './dto/signData.dto';
import { User } from './model/user.model';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}
    
    async create(signUpData: SignDataDto) {
        const userCnt = await this.userModel.count();
        console.log(signUpData);
        await this.userModel.create({
            id: userCnt + 1,
            username: signUpData.username,
            password: signUpData.password,
            device_cnt: 0,
        });
    }

    async login(signInData: SignDataDto): Promise<User> {
        const user = await this.userModel.findOne({
            where: {
                username: signInData.username,
                password: signInData.password,
            },
        });
        if(!user) {
            throw new NotFoundException('Invalid username and password!');
        }
        return user;
    }
}
