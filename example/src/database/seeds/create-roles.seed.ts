import { Factory, Seeder } from 'typeorm-seeding';
import { Permission, Role } from '../entities';
import { getRepository } from 'typeorm';

export default class CreateRolesSeed implements Seeder {
  public roles = [
    {
      name: 'SUPER-ADMIN',
      description: 'Rol que tiene todos los permisos de la plataforma',
      permissions: [],
    },
    {
      name: 'ADMIN',
      description: 'Rol para los administradores de la plataforma',
      permissions: [
        'PROFILE-READ',
        'PROFILE-EDIT',
        'USER-CREATE',
        'USER-READ',
        'USER-EDIT',
        'USER-DELETE',
        'ROLE-CREATE',
        'ROLE-READ',
        'ROLE-EDIT',
        'ROLE-DELETE',
      ],
    },
    {
      name: 'GENERAL',
      description: 'Rol para los usuarios normales de la plataforma',
      permissions: ['PROFILE-READ', 'PROFILE-EDIT'],
    },
  ];

  public async run(factory: Factory): Promise<void> {
    for (const role of this.roles) {
      let permissions: Permission[] = [];
      if (role.name === 'SUPER-ADMIN') {
        permissions = await getRepository(Permission).find({
          where: {},
        });
      } else {
        const permissionData = await getRepository(Permission).findOne({
          where: { name: role.name },
        });
        if (permissionData) {
          permissions.push(permissionData);
        }
      }
      console.log(' ...Seeding roles... ');
      const createdRole = await factory(Role)().create({
        name: role.name,
        description: role.description,
        permissions: [],
      });
      createdRole.permissions = permissions;
      await createdRole.save();
    }
  }
}
