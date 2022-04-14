import { EntityRepository, Repository } from 'typeorm';
import { Contact } from '@database/entities';

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {}
