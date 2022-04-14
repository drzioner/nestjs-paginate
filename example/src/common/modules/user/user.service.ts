import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User, Role } from '@database/entities';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { plainToClass } from 'class-transformer';
import { RoleService } from '../role/role.service';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly _rolesService: RoleService,
  ) {}

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: User,
        dto: UserDto,
        fields: ['name', 'lastname', 'username', 'email'],
        relations: ['roles'],
        route: 'users',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async getAll(): Promise<UserDto[]> {
    const users: User[] = await this.userRepository.find({
      where: {},
    });
    if (!users) {
      throw new NotFoundException();
    }
    return plainToClass(UserDto, users);
  }

  async get(id: number): Promise<UserDto> {
    const user: User = await this.getUser(id);
    return plainToClass(UserDto, user);
  }

  async getUser(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('User id must be sent');
    }
    const user: User = await this.userRepository.findOne(id, {
      where: {},
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    const roles: Role[] = await this._rolesService.getRoles(user.roles);
    const userCreate = plainToClass(User, { ...user, roles });
    const createdUser: User = await this.userRepository.save(userCreate);
    return plainToClass(UserDto, createdUser);
  }

  async update(
    id: number,
    userUpdate: Partial<UpdateUserDto>,
  ): Promise<UserDto> {
    const user: User = await this.getUser(id);
    if (userUpdate?.roles?.length > 0) {
      user.roles = await this._rolesService.getRoles(userUpdate.roles);
    }
    user.name = userUpdate.name ?? user.name;
    user.username = userUpdate.username ?? user.username;
    user.email = userUpdate.email ?? user.email;
    user.status = userUpdate.status ?? user.status;
    if (userUpdate.password) {
      user.password = userUpdate.password;
    }
    await user.save();
    return plainToClass(UserDto, user);
  }

  async delete(id: number): Promise<boolean> {
    const user: User = await this.getUser(id);
    if (user) {
      const deleteUser = await this.userRepository.softDelete(id);
      return !!deleteUser;
    }
    return false;
  }
}
