import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AssembleResponseDto {
  @IsNotEmpty()
  readonly dto: any;

  @IsNotEmpty()
  @IsArray()
  readonly items: any[];

  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  @IsNotEmpty()
  @IsNumber()
  readonly take: number;

  @IsNotEmpty()
  @IsNumber()
  readonly page: number;

  @IsOptional()
  @IsString()
  readonly route: string;

  @IsOptional()
  @IsString()
  readonly keyword: string;

  @IsOptional()
  @IsString()
  readonly filters: string;

  @IsOptional()
  @IsString()
  readonly status: string;
}
