import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CityService } from './city.service';
import { CityDto, CreateCityDto, UpdateCityDto } from './dto';
import { Permission } from '@common/decotators';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@common/guards';
import { ResponseDto } from '@common/dtos';
import { plainToClass } from 'class-transformer';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';

@ApiTags('Cities')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @Permission({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async create(@Body() createCityDto: CreateCityDto): Promise<ResponseDto> {
    const city: CityDto = await this.cityService.create(createCityDto);
    return plainToClass(ResponseDto, {
      message: 'City successfully created',
      data: { city },
    });
  }

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAnaPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const cities = await this.cityService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Cities loaded correctly',
      data: { cities },
    });
  }

  @Get('all')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAll(): Promise<ResponseDto> {
    const cities: CityDto[] = await this.cityService.findAll();
    return plainToClass(ResponseDto, {
      message: 'Cities loaded correctly',
      data: { cities },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const city: CityDto = await this.cityService.findOne(+id);
    return plainToClass(ResponseDto, {
      message: 'City loaded correctly',
      data: { city },
    });
  }

  @Patch(':id')
  @Permission({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCityDto: Partial<UpdateCityDto>,
  ): Promise<ResponseDto> {
    const city: CityDto = await this.cityService.update(+id, updateCityDto);
    return plainToClass(ResponseDto, {
      message: 'City successfully updated',
      data: { city },
    });
  }

  @Delete(':id')
  @Permission({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const deletedCity: boolean = await this.cityService.remove(+id);
    if (deletedCity) {
      return plainToClass(ResponseDto, {
        message: 'City successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException('City not deleted due to internal error');
  }
}
