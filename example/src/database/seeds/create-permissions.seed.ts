import { Factory, Seeder } from 'typeorm-seeding';
import { Permission } from '../entities';

export default class CreatePermissionsSeed implements Seeder {
  public permissions = [
    {
      name: 'PROFILE-READ',
      description: 'Ver mi información de perfil',
    },
    {
      name: 'PROFILE-EDIT',
      description: 'Editar la información de mi perfil',
    },
    {
      name: 'USER-CREATE',
      description: 'Crear usuarios',
    },
    {
      name: 'USER-READ',
      description: 'Ver la información de los usuarios',
    },
    {
      name: 'USER-EDIT',
      description: 'Actualizar usuarios',
    },
    {
      name: 'USER-DELETE',
      description: 'Eliminar usuarios',
    },
    {
      name: 'ADMIN-CREATE',
      description: 'Crear opciones de administración',
    },
    {
      name: 'ADMIN-READ',
      description: 'Ver la información de las opciones de administración',
    },
    {
      name: 'ADMIN-EDIT',
      description: 'Actualizar opciones de administración',
    },
    {
      name: 'ADMIN-DELETE',
      description: 'Eliminar opciones de administración',
    },
  ];
  public async run(factory: Factory): Promise<void> {
    console.log(' ...Seeding permissions... ');
    for (const permission of this.permissions) {
      await factory(Permission)().create({
        name: permission.name,
        description: permission.description,
      });
    }
  }
}
