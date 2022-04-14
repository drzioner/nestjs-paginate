import { Factory, Seeder } from 'typeorm-seeding';
import { IdentificationType } from '../entities';

export default class CreateIdentificationTypesSeed implements Seeder {
  public identificationTypes = [
    {
      name: 'Cédula de Ciudadanía',
      abbreviation: 'CC',
    },
    {
      name: 'Cédula de Extranjería ',
      abbreviation: 'CE',
    },
    {
      name: 'Pasaporte',
      abbreviation: 'PP',
    },
    {
      name: 'Número de Identificación Tributaria',
      abbreviation: 'NIT',
    },
  ];
  public async run(factory: Factory): Promise<void> {
    console.log(' ...Seeding identification types... ');
    for (const identificationType of this.identificationTypes) {
      await factory(IdentificationType)().create({
        name: identificationType.name,
        abbreviation: identificationType.abbreviation,
      });
    }
  }
}
