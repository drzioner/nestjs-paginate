import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '@database/entities';
import { RoleModule } from '@common/modules/role/role.module';
import { TokenModule } from '@common/modules/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    RoleModule,
    TokenModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
