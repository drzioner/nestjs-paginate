import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { City } from '@database/entities';
import { DepartmentModule } from '@common/modules/department/department.module';
import { Pagination } from '@common/classes';

@Module({
  imports: [TypeOrmModule.forFeature([City]), AuthModule, DepartmentModule],
  controllers: [CityController],
  providers: [CityService, Pagination],
  exports: [CityService],
})
export class CityModule {}
