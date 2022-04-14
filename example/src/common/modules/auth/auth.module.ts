import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Configuration } from '@common/enums/config.keys';
import { JwtStrategy } from '@common/modules/auth/strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenModule } from '@common/modules/token/token.module';
import { AuthRepository } from '@common/modules/auth/auth.repository';
import { TokenRepository } from '@common/modules/token/token.repository';

@Module({
  imports: [
    TokenModule,
    TypeOrmModule.forFeature([AuthRepository, TokenRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: parseInt(config.get(Configuration.JWT_EXPIRES_IN)),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
