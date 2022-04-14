import { EntityRepository, Repository } from 'typeorm';
import { Permission } from '@database/entities';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {}
