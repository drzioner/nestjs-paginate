import { EntityRepository, Repository } from 'typeorm';
import { Department } from '@database/entities';

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {}
