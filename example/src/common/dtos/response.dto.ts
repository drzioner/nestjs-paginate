import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Expose()
export class ResponseDto {
  @IsNotEmpty()
  message: string;
  data: unknown[];
}
