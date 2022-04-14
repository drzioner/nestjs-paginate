import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonTypeDto } from './create-person-type.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePersonTypeDto extends PartialType(CreatePersonTypeDto) {
  @IsOptional()
  @IsString()
  readonly status: string;
}
