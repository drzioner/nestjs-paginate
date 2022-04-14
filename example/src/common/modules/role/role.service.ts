import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role, Permission } from '@database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { plainToClass, plainToInstance } from 'class-transformer';
import { RoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { PermissionService } from '../permission/permission.service';
import { Status } from '@common/enums';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
    private readonly _permissionsService: PermissionService,
  ) {}

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: Role,
        dto: RoleDto,
        fields: ['name'],
        relations: ['permissions'],
        route: 'roles',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async getAll(): Promise<RoleDto[]> {
    const roles: Role[] = await this.roleRepository.find({
      where: {},
    });
    if (!roles) {
      throw new NotFoundException('Roles not found');
    }
    return plainToInstance(RoleDto, roles);
  }

  async get(id: number): Promise<RoleDto> {
    const role: Role = await this.getRole(id);
    return plainToClass(RoleDto, role);
  }

  async getRole(id: number, status: string = Status.ACTIVE): Promise<Role> {
    if (!id) {
      throw new BadRequestException('Role id must be sent');
    }
    const role: Role = await this.roleRepository.findOne(id, {
      where: { status },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async create(createRole: Partial<CreateRoleDto>): Promise<RoleDto> {
    const permissions: Permission[] =
      await this._permissionsService.arrayToPermissions(createRole.permissions);
    const roleCreate = plainToClass(Role, { ...createRole, permissions });
    const role: Role = await this.roleRepository.save(roleCreate);
    if (!role) {
      throw new BadRequestException('Error saving the role');
    }
    return plainToClass(RoleDto, role);
  }

  async update(
    id: number,
    updateRole: Partial<UpdateRoleDto>,
  ): Promise<RoleDto> {
    const role: Role = await this.getRole(id);
    if (updateRole?.permissions?.length > 0) {
      role.permissions = await this._permissionsService.arrayToPermissions(
        updateRole.permissions,
      );
    }
    role.name = updateRole.name ?? role.name;
    role.description = updateRole.description ?? role.description;
    role.status = updateRole.status ?? role.status;
    await role.save();
    return plainToClass(RoleDto, role);
  }

  async delete(id: number): Promise<boolean> {
    const role: Role = await this.getRole(id);
    if (role) {
      const deleteRole = await this.roleRepository.softDelete(id);
      return !!deleteRole;
    }
    return false;
  }

  async roleSearch(role: string): Promise<Role> {
    if (!role) {
      throw new BadRequestException('role must be sent');
    }
    const roleSearch: Role = await this.roleRepository.findOne({
      where: { status: Status.ACTIVE, name: role },
    });
    if (!roleSearch) {
      throw new NotFoundException('Role not found');
    }
    return plainToClass(Role, roleSearch);
  }

  async getRoles(rolesId: number[]): Promise<Role[]> {
    const roles: Role[] = [];
    for (const role of rolesId) {
      const roleValue = await this.getRole(role);
      if (roleValue) {
        roles.push(roleValue);
      }
    }
    return roles;
  }
}
