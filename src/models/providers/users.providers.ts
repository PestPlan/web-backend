import { User } from '../entities/user.entity';

export const usersProviders = [
    {
        provide: 'UserRepository',
        useValue: User,
    },
];
