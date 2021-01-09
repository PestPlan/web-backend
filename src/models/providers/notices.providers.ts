import { Notice } from '../entities/notice.entity';

export const noticesProviders = [
    {
        provide: 'NoticeRepository',
        useValue: Notice,
    },
];
