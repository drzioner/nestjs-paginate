import { EntityRepository, Repository } from 'typeorm';
import { City } from '@database/entities';

@EntityRepository(City)
export class CityRepository extends Repository<City> {}
