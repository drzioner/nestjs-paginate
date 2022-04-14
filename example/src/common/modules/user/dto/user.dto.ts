import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ReadRoleDto } from '../../role/dto';
import { ReadPermissionDto } from '../../permission/dto';
@Exclude()
export class UserDto {
  @Expose()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsNotEmpty()
  photoUrl: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => ReadRoleDto)
  roles: ReadRoleDto[];

  @Expose()
  @IsNotEmpty()
  @Type(() => ReadPermissionDto)
  permissions: ReadPermissionDto[];

  @Expose()
  @IsOptional()
  @IsString()
  authToken: string;
}
