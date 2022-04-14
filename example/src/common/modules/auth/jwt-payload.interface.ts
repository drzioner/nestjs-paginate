import { ReadRoleDto } from '../role/dto';
import { ReadPermissionDto } from '../permission/dto';

export interface IJwtPayload {
  id: number;
  username: string;
  email: string;
  roles: ReadRoleDto[];
  permissions: ReadPermissionDto[];
  iat?: Date;
}
