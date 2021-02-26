import { USER_PROVIDE } from 'src/constants/constants';
import { User } from '../entities/user.entity';

export const usersProviders = [
    {
        provide: USER_PROVIDE,
        useValue: User,
    },
];
