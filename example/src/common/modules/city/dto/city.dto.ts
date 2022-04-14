import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { SimplifiedDepartmentDto } from '@common/modules/department/dto';
@Exclude()
export class CityDto {
  @Expose()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  code: string;

  @Expose()
  @Type(() => SimplifiedDepartmentDto)
  department: SimplifiedDepartmentDto;

  @Expose()
  @IsString()
  status: string;
}
