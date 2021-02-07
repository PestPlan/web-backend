import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import * as constants from 'src/constants/constants';
import { AccessTokenDto } from 'src/models/dto/accessToken.dto';
import { SignDataDto } from 'src/models/dto/signData.dto';
import { UserDocument } from 'src/models/schemas/user.schema';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class LoginService {
    constructor(
        @Inject(constants.USER_MODEL) private userModel: Model<UserDocument>,
        private authService: AuthService,
    ) {}

    /**
     * create - sign-up
     */
    async create(signUpData: SignDataDto) {
        const { username, password } = signUpData;

        // 같은 username이 존재하는지 확인한다.
        if (await this.userModel.exists({ "username": username })) {
            throw new NotFoundException('Same username is exist. And we should change this exception since this is not a NotFoundException!!!!');
        }

        // User에 데이터를 추가한다.
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUserData = {
            username,
            password: hashedPwd,
        };

        new this.userModel(newUserData).save();
    }

    /**
     * login - sign-in
     */
    async login(signInData: SignDataDto): Promise<AccessTokenDto> {
        const { username, password } = signInData;

        // username이 존재하는지 확인한다.
        const userData = await this.userModel.findOne({ "username": username });
        if(!userData) {
            throw new NotFoundException('You should sign up first!');
        }

        // password가 일치하는지 확인한다.
        const pwdMatch = await bcrypt.compare(password, userData.password);
        if (!pwdMatch) {
            throw new NotFoundException('Invalid password!');
        }

        // token을 리턴한다.
        return this.authService.createToken(userData);
    }
}
