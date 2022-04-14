import { User } from '../entities';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsersSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    console.log(' ...Seeding users... ');
    await factory(User)().createMany(5);
  }
}
