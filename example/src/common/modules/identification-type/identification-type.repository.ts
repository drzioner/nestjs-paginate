import { EntityRepository, Repository } from 'typeorm';
import { IdentificationType } from '@database/entities';

@EntityRepository(IdentificationType)
export class IdentificationTypeRepository extends Repository<IdentificationType> {}
