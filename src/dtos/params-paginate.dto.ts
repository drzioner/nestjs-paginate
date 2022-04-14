import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ParamsPaginateDto {
  @IsNotEmpty()
  readonly type: any;

  @IsNotEmpty()
  readonly dto: any;

  @IsNotEmpty()
  @IsString()
  readonly route: string;

  @IsNotEmpty()
  @IsArray()
  readonly fields: string[];

  @IsNotEmpty()
  @IsArray()
  readonly relations: string[];
}
