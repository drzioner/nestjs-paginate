import { EntityRepository, Repository } from 'typeorm';
import { Role } from '@database/entities';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
