import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 150)
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
