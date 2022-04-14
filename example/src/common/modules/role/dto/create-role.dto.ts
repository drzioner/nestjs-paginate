import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  permissions: number[];
}
