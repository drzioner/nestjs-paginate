import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Configuration } from '@common/enums/config.keys';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { Status } from '@common/enums';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const { username } = payload;
    const user = await this._authRepository.findOne({
      where: { username, status: Status.ACTIVE },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
