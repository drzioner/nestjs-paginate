import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

@Expose()
export class PaginateDto {
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @IsNotEmpty()
  @IsArray()
  items: unknown[];

  @IsNotEmpty()
  @IsNumber()
  firstPage: number | string;

  @IsNotEmpty()
  @IsNumber()
  currentPage: number | string;

  @IsNumber()
  nextPage: number | string;

  @IsNumber()
  prevPage: number | string;

  @IsNumber()
  lastPage: number | string;
}
