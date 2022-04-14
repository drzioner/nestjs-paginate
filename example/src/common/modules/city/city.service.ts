import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CityDto, CreateCityDto, UpdateCityDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CityRepository } from './city.repository';
import { City, Department } from '@database/entities';
import { plainToClass, plainToInstance } from 'class-transformer';
import { DepartmentService } from '../department/department.service';
import { Status } from '@common/enums';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityRepository)
    private readonly cityRepository: CityRepository,
    private readonly _departmentService: DepartmentService,
  ) {}
  async create(createCityDto: CreateCityDto): Promise<CityDto> {
    const cityData: City = await this.formatCity(createCityDto);
    const city: City = await this.cityRepository.save(cityData);
    return plainToClass(CityDto, city);
  }

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: City,
        dto: CityDto,
        fields: ['name', 'code'],
        relations: ['department'],
        route: 'cities',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async findAll(): Promise<CityDto[]> {
    const cities: City[] = await this.cityRepository.find({
      where: {},
    });
    if (!cities) {
      throw new NotFoundException('Cities not found');
    }
    return plainToInstance(CityDto, cities);
  }

  async findOne(id: number): Promise<CityDto> {
    const city: City = await this.findCity(id);
    return plainToClass(CityDto, city);
  }

  async findCity(id: number, status: string = Status.ACTIVE): Promise<City> {
    if (!id) {
      throw new BadRequestException('City id must be sent');
    }
    const city: City = await this.cityRepository.findOne(id, {
      where: { status },
    });
    if (!city) {
      throw new NotFoundException('City not found');
    }
    return city;
  }

  async update(
    id: number,
    updateCityDto: Partial<UpdateCityDto>,
  ): Promise<CityDto> {
    const city: City = await this.findCity(id);
    city.name = updateCityDto.name ?? city.name;
    city.code = updateCityDto.code ?? city.code;
    city.status = updateCityDto.status ?? city.status;
    if (updateCityDto.departmentId) {
      city.department = await this.findDepartment(updateCityDto.departmentId);
    }
    await city.save();
    return plainToClass(CityDto, city);
  }

  async remove(id: number): Promise<boolean> {
    const city: City = await this.findCity(id);
    if (city) {
      const deleteCity = await this.cityRepository.softDelete(id);
      return !!deleteCity;
    }
    return false;
  }

  async formatCity(city: CreateCityDto | UpdateCityDto): Promise<City> {
    const department: Department = await this._departmentService.findDepartment(
      city.departmentId,
    );
    return plainToClass(City, {
      ...city,
      department,
    });
  }

  async findDepartment(departmentId: number): Promise<Department> {
    return await this._departmentService.findDepartment(departmentId);
  }
}
