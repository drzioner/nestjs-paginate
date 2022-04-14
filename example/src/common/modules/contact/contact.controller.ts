import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryPaginateDto } from '@drzioner/nestjs-paginate';
import { Permission } from '@common/decotators';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@common/guards';
import { ResponseDto } from '@common/dtos';
import { plainToClass } from 'class-transformer';
import { ContactService } from './contact.service';
import { ContactDto, CreateContactDto, UpdateContactDto } from './dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  constructor(private readonly _contactService: ContactService) {}

  @Get()
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async findAndPaginate(
    @Query() query: QueryPaginateDto,
  ): Promise<ResponseDto> {
    const contacts = await this._contactService.findAndPaginate(query);
    return plainToClass(ResponseDto, {
      message: 'Contacts loaded correctly',
      data: { contacts },
    });
  }

  @Get('all')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getContacts(): Promise<ResponseDto> {
    const contacts: ContactDto[] = await this._contactService.getAll();
    return plainToClass(ResponseDto, {
      message: 'Contacts loaded correctly',
      data: { contacts },
    });
  }

  @Get('info/:id')
  @Permission({ name: 'ADMIN-READ' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async getContact(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const contact: ContactDto = await this._contactService.get(id);
    return plainToClass(ResponseDto, {
      message: 'Contact loaded correctly',
      data: { contact },
    });
  }

  @Post()
  @Permission({ name: 'ADMIN-CREATE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async createContact(@Body() contact: CreateContactDto): Promise<ResponseDto> {
    const contactCreated: ContactDto = await this._contactService.create(
      contact,
    );
    return plainToClass(ResponseDto, {
      message: 'Contact successfully created',
      data: { contact: contactCreated },
    });
  }

  @Patch(':id')
  @Permission({ name: 'ADMIN-EDIT' })
  @UseGuards(AuthGuard(), PermissionGuard)
  @UsePipes(ValidationPipe)
  async updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() contact: Partial<UpdateContactDto>,
  ): Promise<ResponseDto> {
    const contactUpdated: ContactDto = await this._contactService.update(
      id,
      contact,
    );
    return plainToClass(ResponseDto, {
      message: 'Contact successfully updated',
      data: { contact: contactUpdated },
    });
  }

  @Delete(':id')
  @Permission({ name: 'ADMIN-DELETE' })
  @UseGuards(AuthGuard(), PermissionGuard)
  async deleteContact(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto> {
    const deleteSupplier: boolean = await this._contactService.delete(id);
    if (deleteSupplier) {
      return plainToClass(ResponseDto, {
        message: 'Contact successfully deleted',
        data: {},
      });
    }
    throw new NotFoundException('Contact not deleted due to internal error');
  }
}
