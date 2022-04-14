import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  identificationNumber: string;

  @IsNotEmpty()
  @IsNumber()
  identificationTypeId: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(7, 13)
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsNumber()
  cityId: number;

  @IsNotEmpty()
  @IsString()
  direction: string;
}
