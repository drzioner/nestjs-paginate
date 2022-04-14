import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateIdentificationTypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 250)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  abbreviation: string;

  @IsOptional()
  @IsString()
  description: string;
}
