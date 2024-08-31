// import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { ResultData } from 'src/common/utils/result';
import { AppHttpCode } from 'src/common/enums/code.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    // user.password = '';
    // user.salt = '';
    return user;
  }

  async create(dto: CreateUserDto): Promise<ResultData> {
    const existUser = await this.findOneByUsername(dto.username);
    if (existUser) {
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '帐号已存在');
    }

    // 创建用户
    const user = await this.prisma.user.create({
      data: {
        ...dto,
      },
    });

    return ResultData.ok(user);
  }

  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  genToken(payload: { username: string }) {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`;
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    });
    return { accessToken, refreshToken };
  }

  /**
   * 生成刷新 token
   */
  refreshToken(username: string): string {
    return this.jwtService.sign({ username });
  }

  /** 校验 token */
  verifyToken(token: string): string {
    try {
      if (!token) return null;
      const username = this.jwtService.verify(token.replace('Bearer ', ''));
      return username;
    } catch {
      return null;
    }
  }
}
