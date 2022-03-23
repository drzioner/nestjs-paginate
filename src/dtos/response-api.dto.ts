import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Expose()
export class ResponseApiDto {
  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @IsNotEmpty()
  readonly data: unknown | unknown[];
}
