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

import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from '@common/dtos';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './dto';
import { Permission } from '@common/decotators';
import { PermissionGuard } from '@common/guards';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAnaPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const roles = await this.rolesService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Roles loaded correctly',
      data: { roles },
    });
  }

  @Get('all')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getRoles(): Promise<ResponseDto> {
    const roles = await this.rolesService.getAll();
    return plainToClass(ResponseDto, {
      message: 'Roles loaded correctly',
      data: { roles },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const role = await this.rolesService.get(id);
    return plainToClass(ResponseDto, {
      message: 'Role loaded correctly',
      data: { role },
    });
  }

  @Post()
  @Permission({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async createRole(@Body() role: CreateRoleDto): Promise<ResponseDto> {
    const roleCreated: RoleDto = await this.rolesService.create(role);
    return plainToClass(ResponseDto, {
      message: 'Role successfully created',
      data: { role: roleCreated },
    });
  }

  @Patch(':id')
  @Permission({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Partial<UpdateRoleDto>,
  ): Promise<ResponseDto> {
    await this.rolesService.update(id, role);
    const updateRole: RoleDto = await this.rolesService.get(id);
    return plainToClass(ResponseDto, {
      message: 'Role successfully updated',
      data: { role: updateRole },
    });
  }

  @Delete(':id')
  @Permission({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const deleteRole = await this.rolesService.delete(id);
    if (deleteRole) {
      return plainToClass(ResponseDto, {
        message: 'Role successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException('Role not deleted due to internal error');
  }
}
