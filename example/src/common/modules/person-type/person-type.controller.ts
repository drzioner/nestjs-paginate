import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PersonTypeService } from './person-type.service';
import { Permission } from '@common/decotators';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@common/guards';
import { ResponseDto } from '@common/dtos';
import { plainToClass } from 'class-transformer';
import { PersonTypeDto, CreatePersonTypeDto, UpdatePersonTypeDto } from './dto';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';

@ApiTags('Person Types')
@Controller('person-types')
export class PersonTypeController {
  constructor(private readonly personTypeService: PersonTypeService) {}

  @Post()
  @Permission({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async create(
    @Body() createPersonTypeDto: CreatePersonTypeDto,
  ): Promise<ResponseDto> {
    const personType: PersonTypeDto = await this.personTypeService.create(
      createPersonTypeDto,
    );
    return plainToClass(ResponseDto, {
      message: 'Person type successfully created',
      data: { personType },
    });
  }

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAnaPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const personTypes = await this.personTypeService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Person types loaded correctly',
      data: { personTypes },
    });
  }

  @Get('all')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAll(): Promise<ResponseDto> {
    const personTypes: PersonTypeDto[] = await this.personTypeService.findAll();
    return plainToClass(ResponseDto, {
      message: 'Person types loaded correctly',
      data: { personTypes },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const personType: PersonTypeDto = await this.personTypeService.findOne(+id);
    return plainToClass(ResponseDto, {
      message: 'Person type loaded correctly',
      data: { personType },
    });
  }

  @Patch(':id')
  @Permission({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonTypeDto: Partial<UpdatePersonTypeDto>,
  ): Promise<ResponseDto> {
    const personType: PersonTypeDto = await this.personTypeService.update(
      +id,
      updatePersonTypeDto,
    );
    return plainToClass(ResponseDto, {
      message: 'Person type successfully updated',
      data: { personType },
    });
  }

  @Delete(':id')
  @Permission({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const deletedPersonType: boolean = await this.personTypeService.remove(+id);
    if (deletedPersonType) {
      return plainToClass(ResponseDto, {
        message: 'Person type successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException(
      'Person type not deleted due to internal error',
    );
  }
}
