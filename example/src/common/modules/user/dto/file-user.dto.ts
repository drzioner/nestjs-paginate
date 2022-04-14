import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FileUserDto {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsOptional()
  @IsString()
  filename: string;
}
