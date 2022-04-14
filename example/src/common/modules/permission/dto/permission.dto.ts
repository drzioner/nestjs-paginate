import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class PermissionDto {
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
}
