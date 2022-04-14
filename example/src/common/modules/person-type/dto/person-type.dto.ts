import { IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class PersonTypeDto {
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
  description: string;

  @Expose()
  @IsString()
  status: string;
}
