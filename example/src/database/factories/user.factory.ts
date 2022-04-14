import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from '../entities';

define(User, (faker: typeof Faker) => {
  const user = new User();
  const gender = faker.random.number(1);
  user.name = `${faker.name.firstName(gender)} ${faker.name.lastName(gender)}`;
  user.username = faker.name.lastName().toLowerCase();
  user.email = faker.internet.email().toLowerCase();
  user.password = 'password';
  return user;
});
