import { Module } from '@nestjs/common';
import { IdentificationTypeService } from './identification-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentificationTypeController } from './identification-type.controller';
import { AuthModule } from '../auth/auth.module';
import { IdentificationType } from '@database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([IdentificationType]), AuthModule],
  providers: [IdentificationTypeService],
  controllers: [IdentificationTypeController],
  exports: [IdentificationTypeService],
})
export class IdentificationTypeModule {}
