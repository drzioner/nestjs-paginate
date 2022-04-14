import { SetMetadata } from '@nestjs/common';
import { PermissionInterface } from '../interfaces';

export const Permission = (params: PermissionInterface) =>
  SetMetadata('permission', params);
