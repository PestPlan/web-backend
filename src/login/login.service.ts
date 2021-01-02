import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignDataDto } from './dto/signData.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { AccessTokenDto } from 'src/auth/dto/accessToken.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private authService: AuthService,
    ) {}
    
    /**
     * existsUsername - User model에 같은 username이 존재하는지 확인한다.
     * @returns Promise<User> - 존재할 경우
     *          null - 존재하지 않을 경우
     */
    async existsUsername(username: string): Promise<User> {
        const isExist = await this.userModel.findOne({
            where: {
                username,
            }
        });
        return isExist;
    }

    /**
     * create - sign-up
     */
    async create(signUpData: SignDataDto) {
        const { username, password } = signUpData;

        // 같은 username이 존재하는지 확인한다.
        if(await this.existsUsername(username)) {
            throw new NotFoundException('Same username is exist. And we should change this exception since this is not a NotFoundException!!!!');
        }

        // User에 데이터를 추가한다.
        const userCnt = await this.userModel.count();
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);
        await this.userModel.create({
            id: userCnt + 1,
            username,
            password: hashedPwd,
            salt,
            device_cnt: 0,
        });
    }

    /**
     * login - sign-in
     */
    async login(signInData: SignDataDto): Promise<AccessTokenDto> {
        const { username, password } = signInData;

        // username이 존재하는지 확인한다.
        const user = await this.existsUsername(username);
        if(!user) {
            throw new NotFoundException('There has no username!');
        }

        // password가 일치하는지 확인한다.
        const pwdMatch = await bcrypt.compare(password, user.password);
        if(!pwdMatch) {
            throw new NotFoundException('Invalid password!');
        }

        // token을 리턴한다.
        return this.authService.createToken(user);
    }
}
