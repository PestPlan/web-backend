import { Equals, IsBoolean } from 'class-validator';

export class NewReadStatusDto {
    @Equals(true)
    @IsBoolean()
    readonly is_read: boolean;
}
