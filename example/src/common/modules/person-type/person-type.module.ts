import { Module } from '@nestjs/common';
import { PersonTypeService } from './person-type.service';
import { PersonTypeController } from './person-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PersonType } from '@database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PersonType]), AuthModule],
  controllers: [PersonTypeController],
  providers: [PersonTypeService],
  exports: [PersonTypeService],
})
export class PersonTypeModule {}
