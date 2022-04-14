import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Role } from '../entities';

define(Role, (faker: typeof Faker) => {
  const role = new Role();
  role.name = faker.random.word();
  role.description = faker.random.words(4);
  return role;
});
