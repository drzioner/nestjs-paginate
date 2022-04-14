import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRepository } from './permission.repository';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Permission } from '@database/entities';
import { CreatePermissionDto, PermissionDto, UpdatePermissionDto } from './dto';
import { Status } from '@common/enums';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: Permission,
        dto: PermissionDto,
        fields: ['name'],
        relations: [],
        route: 'permissions',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async getAll(): Promise<Permission[]> {
    const permissions: Permission[] = await this.permissionRepository.find({});
    if (!permissions) {
      throw new NotFoundException('Permissions not found');
    }
    return plainToInstance(Permission, permissions);
  }

  async getPermissions(): Promise<PermissionDto[]> {
    const permissions: Permission[] = await this.getAll();
    return plainToInstance(PermissionDto, permissions);
  }

  async getOne(
    id: number,
    status: string = Status.ACTIVE,
  ): Promise<Permission> {
    if (!id) {
      throw new BadRequestException('Permission id must be sent');
    }
    const permission: Permission = await this.permissionRepository.findOne(id, {
      where: { status },
    });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async getPermission(id: number): Promise<PermissionDto> {
    const permission: Permission = await this.getOne(id);
    return plainToClass(PermissionDto, permission);
  }

  async create(createPermission: CreatePermissionDto): Promise<PermissionDto> {
    const permission: Permission = await this.permissionRepository.save(
      createPermission,
    );
    return plainToClass(PermissionDto, permission);
  }

  async update(
    id: number,
    updatePermission: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    const permission: Permission = await this.getOne(id);
    permission.name = updatePermission.name ?? permission.name;
    permission.description =
      updatePermission.description ?? permission.description;
    permission.status = updatePermission.status ?? permission.status;
    await permission.save();
    return plainToClass(PermissionDto, permission);
  }

  async delete(id: number): Promise<boolean> {
    const permission: Permission = await this.getOne(id);
    if (permission) {
      const deletePermission = await this.permissionRepository.softDelete(id);
      return !!deletePermission;
    }
    return false;
  }

  async permissionSearch(permission: string): Promise<Permission> {
    if (!permission) {
      throw new BadRequestException('permission must be sent');
    }
    const permissionSearch: Permission =
      await this.permissionRepository.findOne({
        where: { name: permission },
      });

    if (!permissionSearch) {
      throw new NotFoundException();
    }
    return plainToClass(Permission, permissionSearch);
  }

  async arrayToPermissions(permissionsId: number[]): Promise<Permission[]> {
    const permissions: Permission[] = [];
    for (const permission of permissionsId) {
      const permissionValue = await this.getOne(permission);
      if (permission) {
        permissions.push(permissionValue);
      }
    }
    return permissions;
  }
}
