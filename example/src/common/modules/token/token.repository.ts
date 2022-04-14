import { EntityRepository, Repository } from 'typeorm';
import { Token } from '@database/entities';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
