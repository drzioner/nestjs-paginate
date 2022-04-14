import { EntityRepository, Repository } from 'typeorm';
import { User } from '@database/entities';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {}
