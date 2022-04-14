import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { IdentificationType } from '../entities';

define(IdentificationType, (faker: typeof Faker) => {
  const identificationType = new IdentificationType();
  identificationType.name = faker.random.words(2);
  identificationType.abbreviation = faker.random.word();
  return identificationType;
});
