import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../user/dto';
import { User } from '@database/entities';
import { AuthRepository } from './auth.repository';
import { SigInResponseDto, LoginDto } from './dto';
import { IJwtPayload } from './jwt-payload.interface';
import { ReadRoleDto } from '../role/dto';
import { ReadPermissionDto } from '../permission/dto';
import { TokenService } from '../token/token.service';
import { Status } from '@common/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
    private readonly _tokensService: TokenService,
  ) {}

  async signIn(signInDto: LoginDto): Promise<SigInResponseDto> {
    const { username, password } = signInDto;
    const user: User = await this.authRepository.findOne({
      where: { username, status: Status.ACTIVE },
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid password');
    }
    const roles = plainToClass(ReadRoleDto, user.roles);
    const permissions = plainToClass(ReadPermissionDto, user.permissions);
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles,
      permissions,
    };
    const token = this._jwtService.sign(payload);
    if (!token) {
      throw new UnauthorizedException(
        'Token not created due to internal error',
      );
    }
    await this._tokensService.create({ token, user });
    return plainToClass(SigInResponseDto, {
      user: { ...user, authToken: token },
    });
  }

  async validateToken(userId: number): Promise<UserDto> {
    const user: User = await this.authRepository.findOne({
      where: { id: userId, status: Status.ACTIVE },
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    return plainToClass(UserDto, user);
  }

  async refreshToken(userId: number): Promise<SigInResponseDto> {
    const user: User = await this.authRepository.findOne({
      where: { id: userId, status: Status.ACTIVE },
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: [],
      permissions: [],
    };
    const token = this._jwtService.sign(payload);
    await this._tokensService.create({ token, user });
    return plainToClass(SigInResponseDto, {
      user: { ...user, authToken: token },
    });
  }

  async signOut(userId: number): Promise<void> {
    const user: User = await this.authRepository.findOne({
      where: { id: userId, status: Status.ACTIVE },
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }
    const deactivateResponse = await this._tokensService.deactivateAll(user);
    if (!deactivateResponse) {
      throw new NotFoundException('Token not deleted due to internal error');
    }
  }
}
