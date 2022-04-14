import { Permission } from '../entities';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Permission, (faker: typeof Faker) => {
  const permission = new Permission();
  permission.name = faker.random.word();
  permission.description = faker.random.words(4);
  return permission;
});
