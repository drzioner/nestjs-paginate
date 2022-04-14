import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@common/guards';
import { Permission } from '@common/decotators';
import { ResponseDto } from '@common/dtos';
import { plainToClass } from 'class-transformer';
import { CreatePermissionDto, PermissionDto, UpdatePermissionDto } from './dto';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAnaPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const permissions = await this.permissionService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Permissions loaded correctly',
      data: { permissions },
    });
  }

  @Get('all')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getPermissions(): Promise<ResponseDto> {
    const permissions: PermissionDto[] =
      await this.permissionService.getPermissions();
    return plainToClass(ResponseDto, {
      message: 'Permissions loaded correctly',
      data: { permissions },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getPermission(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const permission: PermissionDto =
      await this.permissionService.getPermission(id);
    return plainToClass(ResponseDto, {
      message: 'Permission loaded correctly',
      data: { permission },
    });
  }

  @Post()
  @Permission({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async create(
    @Body() createPermission: CreatePermissionDto,
  ): Promise<ResponseDto> {
    const permission: PermissionDto = await this.permissionService.create(
      createPermission,
    );
    return plainToClass(ResponseDto, {
      message: 'Permission successfully created',
      data: { permission },
    });
  }

  @Patch(':id')
  @Permission({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermission: UpdatePermissionDto,
  ): Promise<ResponseDto> {
    const permission: PermissionDto = await this.permissionService.update(
      id,
      updatePermission,
    );
    return plainToClass(ResponseDto, {
      message: 'Permission successfully updated',
      data: { permission },
    });
  }

  @Delete(':id')
  @Permission({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const deletePermission: boolean = await this.permissionService.delete(id);
    if (deletePermission) {
      return plainToClass(ResponseDto, {
        message: 'Permission successfully deleted',
        data: {},
      });
    }
    throw new BadRequestException('A service error occurred');
  }
}
