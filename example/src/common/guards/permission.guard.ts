import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '@database/entities';
import { PermissionInterface } from '../interfaces';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    let permissionParams = this.reflector.get<PermissionInterface>(
      'permission',
      context.getHandler(),
    );

    if (!permissionParams) {
      permissionParams = this.reflector.get<PermissionInterface>(
        'permission',
        context.getClass(),
      );
    }

    if (!permissionParams) return true;
    if (!user) return true;

    const permissionsUser = user.permissions;
    let permissionValidated = false;
    for (const permission of permissionsUser) {
      if (
        permission.name.toUpperCase() === permissionParams.name.toUpperCase()
      ) {
        permissionValidated = true;
      }
    }
    if (permissionValidated) return true;
  }
}
