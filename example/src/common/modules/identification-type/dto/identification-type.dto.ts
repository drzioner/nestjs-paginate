import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class IdentificationTypeDto {
  @Expose()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  abbreviation: string;

  @Expose()
  @IsString()
  status: string;
}
