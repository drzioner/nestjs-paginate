import { Factory, Seeder } from 'typeorm-seeding';
import { PersonType } from '../entities';

export default class CreatePersonTypesSeed implements Seeder {
  public personTypes = [
    {
      name: 'Persona natural',
      abbreviation: 'Personal',
    },
    {
      name: 'Persona jurídica',
      abbreviation: 'Jurídica',
    },
  ];
  public async run(factory: Factory): Promise<void> {
    console.log(' ...Seeding person types... ');
    for (const personType of this.personTypes) {
      await factory(PersonType)().create({
        name: personType.name,
        abbreviation: personType.abbreviation,
      });
    }
  }
}
