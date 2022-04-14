import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { CityDto } from '../../city/dto';
@Exclude()
export class DepartmentDto {
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
  @IsArray()
  @Type(() => CityDto)
  cities: CityDto[];

  @Expose()
  @IsString()
  status: string;
}
