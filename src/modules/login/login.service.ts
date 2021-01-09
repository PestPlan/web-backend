import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SignDataDto } from '../../models/dto/signData.dto';
import { User } from '../../models/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/modules/auth/auth.service';
import { AccessTokenDto } from 'src/models/dto/accessToken.dto';

@Injectable()
export class LoginService {
    constructor(
        @Inject('UserRepository')
        private userRepository: typeof User,
        private authService: AuthService,
    ) {}

    /**
     * existsUsername - User model에 같은 username이 존재하는지 확인한다.
     * @returns Promise<User> - 존재할 경우
     *          null - 존재하지 않을 경우
     */
    async existsUsername(username: string): Promise<User> {
        const isExist = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        return isExist;
    }

    /**
     * create - sign-up
     */
    async create(signUpData: SignDataDto) {
        const { username, password } = signUpData;

        // 같은 username이 존재하는지 확인한다.
        if (await this.existsUsername(username)) {
            throw new NotFoundException('Same username is exist. And we should change this exception since this is not a NotFoundException!!!!');
        }

        // User에 데이터를 추가한다.
        const userCnt = await this.userRepository.count();
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUser = await this.userRepository.create({
            id: userCnt + 1,
            username: username,
            password: hashedPwd,
            salt,
        });

        return newUser;
    }

    /**
     * login - sign-in
     */
    async login(signInData: SignDataDto): Promise<AccessTokenDto> {
        const { username, password } = signInData;

        // username이 존재하는지 확인한다.
        const user = await this.existsUsername(username);
        if (!user) {
            throw new NotFoundException('There has no username!');
        }

        // password가 일치하는지 확인한다.
        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) {
            throw new NotFoundException('Invalid password!');
        }

        // token을 리턴한다.
        return this.authService.createToken(user);
    }
}
