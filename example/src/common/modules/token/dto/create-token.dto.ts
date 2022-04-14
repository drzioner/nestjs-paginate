import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../../../../database/entities';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  token: string;

  @IsOptional()
  @Type(() => User)
  user: User;
}
