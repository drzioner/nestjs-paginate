import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../user/dto';

@Exclude()
export class SigInResponseDto {
  @Expose()
  @IsNotEmpty()
  @Type(() => UserDto)
  user: UserDto;
}
