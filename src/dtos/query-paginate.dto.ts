import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryPaginateDto {
  @IsOptional()
  @IsNumber()
  readonly page: number;

  @IsOptional()
  @IsNumber()
  readonly limit: number;

  @IsOptional()
  @IsString()
  readonly keyword: string;

  @IsOptional()
  @IsString()
  readonly filters: string;

  @IsOptional()
  @IsString()
  readonly status: string;

  @IsOptional()
  @IsBoolean()
  readonly showRoute: boolean;
}
