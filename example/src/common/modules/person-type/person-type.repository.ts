import { EntityRepository, Repository } from 'typeorm';
import { PersonType } from '@database/entities';

@EntityRepository(PersonType)
export class PersonTypeRepository extends Repository<PersonType> {}
