import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePersonTypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  abbreviation: string;

  @IsOptional()
  @IsString()
  description: string;
}
