import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsOptional()
  @IsString()
  readonly status: string;
}
