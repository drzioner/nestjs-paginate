import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IdentificationTypeService } from './identification-type.service';
import { Permission } from '@common/decotators';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@common/guards';
import { ResponseDto } from '@common/dtos';
import { plainToClass } from 'class-transformer';
import {
  CreateIdentificationTypeDto,
  IdentificationTypeDto,
  UpdateIdentificationTypeDto,
} from './dto';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';

@ApiTags('Identification Types')
@Controller('identification-types')
export class IdentificationTypeController {
  constructor(
    private readonly identificationTypeService: IdentificationTypeService,
  ) {}

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAnaPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const identificationTypes =
      await this.identificationTypeService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Identification types loaded correctly',
      data: { identificationTypes },
    });
  }

  @Get('all')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getIdentificationTypes(): Promise<ResponseDto> {
    const identificationTypes: IdentificationTypeDto[] =
      await this.identificationTypeService.getAll();
    return plainToClass(ResponseDto, {
      message: 'Identification types loaded correctly',
      data: { identificationTypes },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getIdentificationType(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const identificationType: IdentificationTypeDto =
      await this.identificationTypeService.get(id);
    return plainToClass(ResponseDto, {
      message: 'Identification type loaded correctly',
      data: { identificationType },
    });
  }

  @Post()
  @Permission({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async createIdentificationType(
    @Body() identificationType: CreateIdentificationTypeDto,
  ): Promise<ResponseDto> {
    const identificationTypeCreated: IdentificationTypeDto =
      await this.identificationTypeService.create(identificationType);
    return plainToClass(ResponseDto, {
      message: 'Identification type successfully created',
      data: { identificationType: identificationTypeCreated },
    });
  }

  @Patch(':id')
  @Permission({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async updateIdentificationType(
    @Param('id', ParseIntPipe) id: number,
    @Body() identificationType: Partial<UpdateIdentificationTypeDto>,
  ): Promise<ResponseDto> {
    const updateIdentificationType: IdentificationTypeDto =
      await this.identificationTypeService.update(id, identificationType);
    return plainToClass(ResponseDto, {
      message: 'Identification type successfully updated',
      data: { identificationType: updateIdentificationType },
    });
  }

  @Delete(':id')
  @Permission({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async deleteIdentificationType(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const deleteIdentificationType =
      await this.identificationTypeService.delete(id);
    if (deleteIdentificationType) {
      return plainToClass(ResponseDto, {
        message: 'Identification type successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException(
      'Identification type not deleted due to internal error',
    );
  }
}
