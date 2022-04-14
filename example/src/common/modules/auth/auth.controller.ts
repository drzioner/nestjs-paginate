import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { SigInResponseDto, LoginDto } from './dto';
import { GetUser } from '@common/decotators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: LoginDto): Promise<SigInResponseDto> {
    return this._authService.signIn(signInDto);
  }

  @Get('/validate-token')
  @UseGuards(AuthGuard())
  validateToken(@GetUser('id') idUser: number): Promise<UserDto> {
    return this._authService.validateToken(idUser);
  }

  @Get('/refresh-token')
  @UseGuards(AuthGuard())
  refreshToken(@GetUser('id') idUser: number): Promise<SigInResponseDto> {
    return this._authService.refreshToken(idUser);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  async signOut(@GetUser('id') idUser: number): Promise<void> {
    await this._authService.signOut(idUser);
  }
}
