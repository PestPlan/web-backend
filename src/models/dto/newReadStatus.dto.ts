import { Equals, IsBoolean } from 'class-validator';

export class NewReadStatusDto {
    @Equals(true)
    @IsBoolean()
    is_read: boolean;
}
