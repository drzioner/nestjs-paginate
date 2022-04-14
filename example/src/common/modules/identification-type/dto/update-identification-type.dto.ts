import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateIdentificationTypeDto {
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
  status: string;
}
