import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

@Expose()
export class PaginateDto {
  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  @IsNotEmpty()
  @IsNumber()
  readonly limit: number;

  @IsNotEmpty()
  @IsArray()
  readonly items: unknown[];

  @IsNotEmpty()
  @IsNumber()
  readonly firstPage: number | string;

  @IsNotEmpty()
  @IsNumber()
  readonly currentPage: number | string;

  @IsNumber()
  readonly nextPage: number | string;

  @IsNumber()
  readonly prevPage: number | string;

  @IsNumber()
  readonly lastPage: number | string;
}
