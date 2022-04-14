import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePersonTypeDto, CreatePersonTypeDto, PersonTypeDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonTypeRepository } from './person-type.repository';
import { PersonType } from '@database/entities';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Status } from '@common/enums';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class PersonTypeService {
  constructor(
    @InjectRepository(PersonTypeRepository)
    private readonly personTypeRepository: PersonTypeRepository,
  ) {}
  async create(
    createPersonTypeDto: CreatePersonTypeDto,
  ): Promise<PersonTypeDto> {
    const createPersonType: PersonType = await this.personTypeRepository.save(
      createPersonTypeDto,
    );
    return plainToClass(PersonTypeDto, createPersonType);
  }

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: PersonType,
        dto: PersonTypeDto,
        fields: ['name', 'abbreviation'],
        relations: [],
        route: 'person-types',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async findAll(): Promise<PersonTypeDto[]> {
    const personTypes: PersonType[] = await this.personTypeRepository.find({
      where: {},
    });
    if (!personTypes) {
      throw new NotFoundException('Person types not found');
    }
    return plainToInstance(PersonTypeDto, personTypes);
  }

  async findOne(id: number): Promise<PersonTypeDto> {
    const personType: PersonType = await this.findPersonType(id);
    return plainToClass(PersonTypeDto, personType);
  }

  async findPersonType(
    id: number,
    status: string = Status.ACTIVE,
  ): Promise<PersonType> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }
    const personType: PersonType = await this.personTypeRepository.findOne(id, {
      where: { status },
    });
    if (!personType) {
      throw new NotFoundException('Person type not found');
    }
    return personType;
  }

  async update(
    id: number,
    updatePersonTypeDto: Partial<UpdatePersonTypeDto>,
  ): Promise<PersonTypeDto> {
    const personType: PersonType = await this.findPersonType(id);
    personType.name = updatePersonTypeDto.name ?? personType.name;
    personType.abbreviation =
      updatePersonTypeDto.abbreviation ?? personType.abbreviation;
    personType.description =
      updatePersonTypeDto.description ?? personType.description;
    personType.status = updatePersonTypeDto.status ?? personType.status;
    await personType.save();
    return plainToClass(PersonTypeDto, personType);
  }

  async remove(id: number): Promise<boolean> {
    const personType: PersonType = await this.findPersonType(id);
    if (personType) {
      const deletePersonType = await this.personTypeRepository.softDelete(id);
      return !!deletePersonType;
    }
    return false;
  }
}
