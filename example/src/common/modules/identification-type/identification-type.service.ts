import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentificationTypeRepository } from './identification-type.repository';
import { plainToClass } from 'class-transformer';
import { IdentificationType } from '@database/entities';
import {
  IdentificationTypeDto,
  CreateIdentificationTypeDto,
  UpdateIdentificationTypeDto,
} from './dto';
import { Status } from '@common/enums';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class IdentificationTypeService {
  constructor(
    @InjectRepository(IdentificationTypeRepository)
    private readonly identificationTypeRepository: IdentificationTypeRepository,
  ) {}

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: IdentificationType,
        dto: IdentificationTypeDto,
        fields: ['name', 'abbreviation'],
        relations: [],
        route: 'identification-types',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async getAll(): Promise<IdentificationTypeDto[]> {
    const identificationTypes: IdentificationType[] =
      await this.identificationTypeRepository.find({
        where: {},
      });

    if (!identificationTypes) {
      throw new NotFoundException('Identification types not found');
    }

    return plainToClass(IdentificationTypeDto, identificationTypes);
  }

  async get(id: number): Promise<IdentificationTypeDto> {
    const identificationType: IdentificationType =
      await this.getIdentificationType(id);
    return plainToClass(IdentificationTypeDto, identificationType);
  }

  async getIdentificationType(
    id: number,
    status: string = Status.ACTIVE,
  ): Promise<IdentificationType> {
    if (!id) {
      throw new BadRequestException('Identification type id must be sent');
    }
    const identificationType: IdentificationType =
      await this.identificationTypeRepository.findOne(id, {
        where: { status },
      });
    if (!identificationType) {
      throw new NotFoundException('Identification type not found');
    }
    return identificationType;
  }

  async create(
    createIdentificationType: CreateIdentificationTypeDto,
  ): Promise<IdentificationTypeDto> {
    const identificationType: IdentificationType =
      await this.identificationTypeRepository.save(createIdentificationType);
    return plainToClass(IdentificationTypeDto, identificationType);
  }

  async update(
    id: number,
    updateIdentificationType: Partial<UpdateIdentificationTypeDto>,
  ): Promise<IdentificationTypeDto> {
    const identificationType: IdentificationType =
      await this.getIdentificationType(id);
    identificationType.name =
      updateIdentificationType.name ?? identificationType.name;
    identificationType.abbreviation =
      updateIdentificationType.abbreviation ?? identificationType.abbreviation;
    identificationType.status =
      updateIdentificationType.status ?? identificationType.status;
    await identificationType.save();
    return plainToClass(IdentificationTypeDto, identificationType);
  }

  async delete(id: number): Promise<boolean> {
    const identificationType: IdentificationType =
      await this.getIdentificationType(id);
    if (identificationType) {
      const deleteIdentificationType =
        await this.identificationTypeRepository.softDelete(id);
      return !!deleteIdentificationType;
    }
    return false;
  }
}
