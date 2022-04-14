import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { AuthModule } from '../auth/auth.module';
import { Contact } from '@database/entities';
import { DepartmentModule } from '@common/modules/department/department.module';
import { CityModule } from '@common/modules/city/city.module';
import { IdentificationTypeModule } from '@common/modules/identification-type/identification-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    AuthModule,
    DepartmentModule,
    CityModule,
    IdentificationTypeModule,
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
