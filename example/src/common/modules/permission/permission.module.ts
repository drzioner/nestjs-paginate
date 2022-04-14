import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './permission.controller';
import { AuthModule } from '../auth/auth.module';
import { Permission } from '@database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), AuthModule],
  providers: [PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
