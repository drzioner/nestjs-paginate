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

import { UserService } from './user.service';
import { plainToClass } from 'class-transformer';
import { ResponseDto } from '@common/dtos';
import { CreateUserDto, UserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@common/guards';
import { Permission } from '@common/decotators';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAnaPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const users = await this.userService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Users loaded correctly',
      data: { users },
    });
  }

  @Get('all')
  @Permission({ name: 'USER-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getUsers(): Promise<ResponseDto> {
    const users = await this.userService.getAll();
    return plainToClass(ResponseDto, {
      message: 'Users loaded correctly',
      data: { users },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'USER-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
    const user = await this.userService.get(id);
    return plainToClass(ResponseDto, {
      message: 'User loaded correctly',
      data: { user },
    });
  }

  @Post()
  @Permission({ name: 'USER-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userCreate: CreateUserDto): Promise<ResponseDto> {
    const user: UserDto = await this.userService.create(userCreate);
    return plainToClass(ResponseDto, {
      message: 'User successfully created',
      data: { user },
    });
  }

  @Patch(':id')
  @Permission({ name: 'USER-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdate: Partial<UpdateUserDto>,
  ): Promise<ResponseDto> {
    const user: UserDto = await this.userService.update(id, userUpdate);
    return plainToClass(ResponseDto, {
      message: 'User successfully updated',
      data: { user },
    });
  }

  @Delete(':id')
  @Permission({ name: 'USER-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const deleteUser = await this.userService.delete(id);
    if (deleteUser) {
      return plainToClass(ResponseDto, {
        message: 'User successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException('User not deleted due to internal error');
  }
}
