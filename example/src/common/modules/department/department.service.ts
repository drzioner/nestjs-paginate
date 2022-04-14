import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepartmentDto, DepartmentDto, UpdateDepartmentDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentRepository } from './department.repository';
import { Department } from '@database/entities';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Status } from '@common/enums';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentRepository)
    private readonly departmentRepository: DepartmentRepository,
  ) {}
  async create(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentDto> {
    const department: Department = await this.departmentRepository.save(
      createDepartmentDto,
    );
    return plainToClass(DepartmentDto, department);
  }

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: Department,
        dto: DepartmentDto,
        fields: ['name', 'code'],
        relations: ['cities'],
        route: 'departments',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async findAll(): Promise<DepartmentDto[]> {
    const departments: Department[] = await this.departmentRepository.find({
      where: {},
    });
    if (!departments) {
      throw new NotFoundException('Department not found');
    }
    return plainToInstance(DepartmentDto, departments);
  }

  async findOne(id: number): Promise<DepartmentDto> {
    const department: Department = await this.findDepartment(id);
    return plainToClass(DepartmentDto, department);
  }

  async findDepartment(
    id: number,
    status: string = Status.ACTIVE,
  ): Promise<Department> {
    if (!id) {
      throw new BadRequestException('Department id must be sent');
    }
    const department: Department = await this.departmentRepository.findOne(id, {
      where: { status },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: Partial<UpdateDepartmentDto>,
  ): Promise<DepartmentDto> {
    const department: Department = await this.findDepartment(id);
    department.name = updateDepartmentDto.name ?? department.name;
    department.code = updateDepartmentDto.code ?? department.code;
    department.status = updateDepartmentDto.status ?? department.status;
    await department.save();
    return plainToClass(DepartmentDto, department);
  }

  async remove(id: number): Promise<boolean> {
    const department: Department = await this.findDepartment(id);
    if (department) {
      const deleteDepartment = await this.departmentRepository.softDelete(id);
      return !!deleteDepartment;
    }
    return false;
  }
}
