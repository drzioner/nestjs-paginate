import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactRepository } from './contact.repository';
import {
  City,
  Contact,
  Department,
  IdentificationType,
} from '@database/entities';
import { plainToClass } from 'class-transformer';
import { ContactDto, CreateContactDto, UpdateContactDto } from './dto';
import { IdentificationTypeService } from '../identification-type/identification-type.service';
import { Status } from '@common/enums';
import { DepartmentService } from '@common/modules/department/department.service';
import { CityService } from '@common/modules/city/city.service';
import {
  paginate,
  PaginateDto,
  QueryPaginateDto,
} from '@drzioner/nestjs-paginate';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactRepository)
    private readonly contactRepository: ContactRepository,
    private readonly _departmentService: DepartmentService,
    private readonly _cityService: CityService,
    private readonly _identificationTypeService: IdentificationTypeService,
  ) {}

  async findAndPaginate(query: QueryPaginateDto): Promise<PaginateDto> {
    return paginate(
      {
        type: Contact,
        dto: ContactDto,
        fields: ['name', 'lastname', 'email', 'identificationNumber'],
        relations: [],
        route: 'contacts',
      },
      query,
      { status: 'ASC', name: 'ASC' },
    );
  }

  async getAll(): Promise<ContactDto[]> {
    const contacts: Contact[] = await this.contactRepository.find({
      where: {},
    });
    if (!contacts) {
      throw new NotFoundException('Contacts not found');
    }
    return plainToClass(ContactDto, contacts);
  }

  async get(id: number): Promise<ContactDto> {
    const contact: Contact = await this.getContact(id);
    return plainToClass(ContactDto, contact);
  }

  async getContact(
    id: number,
    status: string = Status.ACTIVE,
  ): Promise<Contact> {
    if (!id) {
      throw new BadRequestException('Contact id must be sent');
    }
    const contact: Contact = await this.contactRepository.findOne(id, {
      where: { status },
    });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async create(createContact: Partial<CreateContactDto>): Promise<ContactDto> {
    const identificationType: IdentificationType =
      await this._identificationTypeService.getIdentificationType(
        createContact.identificationTypeId,
      );
    const department: Department = await this._departmentService.findDepartment(
      createContact.departmentId,
    );
    const city: City = await this._cityService.findCity(createContact.cityId);
    const contact: Contact = await this.contactRepository.save({
      ...createContact,
      identificationType,
      department,
      city,
    });
    return plainToClass(ContactDto, contact);
  }

  async update(
    id: number,
    updateContact: Partial<UpdateContactDto>,
  ): Promise<ContactDto> {
    const contact: Contact = await this.getContact(id);
    contact.name = updateContact.name ?? contact.name;
    contact.lastname = updateContact.lastname ?? contact.lastname;
    contact.identificationNumber =
      updateContact.identificationNumber ?? contact.identificationNumber;
    contact.email = updateContact.email ?? contact.email;
    contact.phone = updateContact.phone ?? contact.phone;
    contact.direction = updateContact.direction ?? contact.direction;
    contact.status = updateContact.status ?? contact.status;
    if (updateContact.identificationTypeId) {
      contact.identificationType =
        await this._identificationTypeService.getIdentificationType(
          updateContact.identificationTypeId,
        );
    }
    if (updateContact.departmentId) {
      contact.department = await this._departmentService.findDepartment(
        updateContact.departmentId,
      );
    }
    if (updateContact.cityId) {
      contact.city = await this._cityService.findCity(updateContact.cityId);
    }
    await contact.save();
    return plainToClass(ContactDto, contact);
  }

  async delete(id: number): Promise<boolean> {
    const contact: Contact = await this.getContact(id);
    if (contact) {
      const deleteContact = await this.contactRepository.softDelete(id);
      return !!deleteContact;
    }
    return false;
  }
}
