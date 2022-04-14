import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  @Length(2, 150)
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 150)
  lastname: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  identificationNumber: string;

  @IsOptional()
  @IsNumber()
  identificationTypeId: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(7, 13)
  phone: string;

  @IsOptional()
  @IsNumber()
  departmentId: number;

  @IsOptional()
  @IsNumber()
  cityId: number;

  @IsOptional()
  @IsString()
  direction: string;

  @IsOptional()
  @IsString()
  status: string;
}
