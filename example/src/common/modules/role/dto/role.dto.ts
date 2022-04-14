import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadPermissionDto } from '../../permission/dto';
@Exclude()
export class RoleDto {
  @Expose()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  @Type(() => ReadPermissionDto)
  permissions: ReadPermissionDto[];

  @Expose()
  @IsString()
  status: string;
}
