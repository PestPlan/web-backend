import { User } from '../entitys/user.entity';

export const usersProviders = [
    {
        provide: 'UserRepository',
        useValue: User,
    },
];
