import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 25)
  code: string;

  @IsNotEmpty()
  @IsNumber()
  public departmentId: number;
}
