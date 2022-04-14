import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadIdentificationTypeDto } from '../../identification-type/dto';
@Exclude()
export class ContactDto {
  @Expose()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  identificationNumber: string;

  @Expose()
  @IsNotEmpty()
  @Type(() => ReadIdentificationTypeDto)
  identificationType: ReadIdentificationTypeDto;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  cityId: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  direction: string;
}
