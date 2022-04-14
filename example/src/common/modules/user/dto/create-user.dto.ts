import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly roles: number[];

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @ValidateIf((o) => o.password === o.password_confirmation)
  password_confirmation: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(8)
  status: string;
}
