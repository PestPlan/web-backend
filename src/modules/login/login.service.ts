import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccessTokenDto } from '../../models/dto/accessToken.dto';
import { SignDataDto } from '../../models/dto/signData.dto';
import { User } from '../../models/entities/user.entity';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class LoginService {
    constructor(@Inject('UserRepository') private userRepository: typeof User, private authService: AuthService) {}

    /**
     * create - sign-up
     */
    async create(signUpData: SignDataDto) {
        const { username, password } = signUpData;

        // 같은 username이 존재하는지 확인한다.
        if (
            await this.userRepository
                .count({
                    where: {
                        username,
                    },
                })
                .then((count) => count !== 0)
        ) {
            throw new NotFoundException('Same username is exist. And we should change this exception since this is not a NotFoundException!!!!');
        }

        // User에 데이터를 추가한다.
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUser = {
            id: (await this.userRepository.count()) + 1,
            username,
            password: hashedPwd,
        };

        this.userRepository.create(newUser);
    }

    /**
     * login - sign-in
     */
    async login(signInData: SignDataDto): Promise<AccessTokenDto> {
        const { username, password } = signInData;

        // username이 존재하는지 확인한다.
        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        if (user === null) {
            throw new NotFoundException('You should sign up first!');
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
