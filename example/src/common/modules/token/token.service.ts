import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRepository } from './token.repository';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateTokenDto } from './dto';
import { Token, User } from '@database/entities';
import { Status } from '@common/enums';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private readonly _tokenRepository: TokenRepository,
  ) {}
  async getAll(user: User, status = Status.ACTIVE): Promise<Token[]> {
    const tokens: Token[] = await this._tokenRepository.find({
      where: { status, user },
    });
    if (!tokens) {
      throw new NotFoundException('Tokens not found');
    }
    return plainToInstance(Token, tokens);
  }

  async get(id: number): Promise<Token> {
    if (!id) {
      throw new BadRequestException('Token id must be sent');
    }
    const token: Token = await this._tokenRepository.findOne(id);
    if (!token) {
      throw new NotFoundException('Token not found');
    }
    return plainToClass(Token, token);
  }

  async getToken(token: string): Promise<Token> {
    if (!token) {
      throw new BadRequestException('Token must be sent');
    }
    const tokenSearch: Token = await this._tokenRepository.findOne({
      where: { token, status: Status.ACTIVE },
    });
    if (!tokenSearch) {
      throw new NotFoundException('Token not found');
    }
    return tokenSearch;
  }

  async create(createToken: CreateTokenDto): Promise<boolean> {
    const token: Token = await this._tokenRepository.save(createToken);
    return !!token;
  }

  async deactivate(searchToken: string, user: User): Promise<boolean> {
    const token: Token = await this.getToken(searchToken);
    if (!user) {
      throw new BadRequestException('User must be sent');
    }
    const userToken = await token.user;

    if (userToken.id !== user.id) {
      throw new NotFoundException('Token not found');
    }
    token.status = 'USED';
    const updateRole = await token.save();
    if (!updateRole) {
      throw new NotFoundException('Token not deleted due to internal error');
    }
    return true;
  }

  async deactivateAll(user: User): Promise<boolean> {
    const tokens = await this.getAll(user);
    let validated = true;
    for (const token of tokens) {
      const deactivated = await this.deactivate(token.token, user);
      if (!deactivated) {
        validated = false;
      }
    }
    return validated;
  }
}
