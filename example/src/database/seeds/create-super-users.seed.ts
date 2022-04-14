import { Role, User } from '../entities';
import { Factory, Seeder } from 'typeorm-seeding';
import { getRepository } from 'typeorm';

export default class CreateUsersSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const role: Role = await getRepository(Role).findOne({
      where: { name: 'SUPER-ADMIN' },
    });
    console.log(' ...Seeding super users... ');
    const user = await factory(User)().create({
      name: 'super admin',
      username: 'admin',
      email: 'user@email.com',
      password: 'password',
    });
    user.roles = [role];
    await user.save();
  }
}
