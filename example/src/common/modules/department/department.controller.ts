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

import { DepartmentService } from './department.service';
import { CreateDepartmentDto, DepartmentDto, UpdateDepartmentDto } from './dto';
import { Permission } from '@common/decotators';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@common/guards';
import { ResponseDto } from '@common/dtos';
import { plainToClass } from 'class-transformer';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @Permission({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<ResponseDto> {
    const department: DepartmentDto = await this.departmentService.create(
      createDepartmentDto,
    );
    return plainToClass(ResponseDto, {
      message: 'Department successfully created',
      data: { department },
    });
  }

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAnaPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const departments = await this.departmentService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Departments loaded correctly',
      data: { departments },
    });
  }

  @Get('all')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAll(): Promise<ResponseDto> {
    const departments: DepartmentDto[] = await this.departmentService.findAll();
    return plainToClass(ResponseDto, {
      message: 'Departments loaded correctly',
      data: { departments },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const department: DepartmentDto = await this.departmentService.findOne(+id);
    return plainToClass(ResponseDto, {
      message: 'Department loaded correctly',
      data: { department },
    });
  }

  @Patch(':id')
  @Permission({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDepartmentDto: Partial<UpdateDepartmentDto>,
  ): Promise<ResponseDto> {
    const department: DepartmentDto = await this.departmentService.update(
      +id,
      updateDepartmentDto,
    );
    return plainToClass(ResponseDto, {
      message: 'Department successfully updated',
      data: { department },
    });
  }

  @Delete(':id')
  @Permission({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const deletedDepartment: boolean = await this.departmentService.remove(+id);
    if (deletedDepartment) {
      return plainToClass(ResponseDto, {
        message: 'Department successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException('Department not deleted due to internal error');
  }
}
