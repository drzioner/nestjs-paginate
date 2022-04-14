import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { PersonType } from '../entities';

define(PersonType, (faker: typeof Faker) => {
  const personType = new PersonType();
  personType.name = faker.random.words(2);
  personType.abbreviation = faker.random.word();
  personType.description = faker.random.words(8);
  return personType;
});
