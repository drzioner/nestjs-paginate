import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Role } from '@database/entities';
import { PermissionModule } from '@common/modules/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule, PermissionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
