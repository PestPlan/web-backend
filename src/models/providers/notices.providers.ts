import { Notice } from '../entitys/notice.entity';

export const noticesProviders = [
    {
        provide: 'NoticeRepository',
        useValue: Notice,
    },
];
