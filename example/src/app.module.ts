import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@common/modules/user/user.module';
import { RoleModule } from '@common/modules/role/role.module';
import { AuthModule } from '@common/modules/auth/auth.module';
import { PermissionModule } from '@common/modules/permission/permission.module';
import { TokenModule } from '@common/modules/token/token.module';
import { ContactModule } from '@common/modules/contact/contact.module';
import { IdentificationTypeModule } from '@common/modules/identification-type/identification-type.module';
import { PersonTypeModule } from '@common/modules/person-type/person-type.module';
import { CityModule } from '@common/modules/city/city.module';
import { DepartmentModule } from '@common/modules/department/department.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from '@common/mail/mail.module';
import { Configuration } from '@common/enums';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    RoleModule,
    AuthModule,
    PermissionModule,
    TokenModule,
    ContactModule,
    IdentificationTypeModule,
    PersonTypeModule,
    CityModule,
    DepartmentModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly config: ConfigService) {
    AppModule.port = this.config.get(Configuration.APP_PORT);
  }
}
