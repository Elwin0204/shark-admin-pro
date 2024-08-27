import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaClient,
    private authService: AuthService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
    });

    if (!user) {
      return new ApiException('用户不存在', ApiErrorCode.ERR_USER_NOTEXIST);
    } else if (user.password !== loginDto.password) {
      return new ApiException('密码错误', ApiErrorCode.ERR_PASSWORD);
    } else {
      const { access_token } = await this.authService.createToken({
        id: user.id,
        username: user.username,
      });

      return {
        token: access_token,
      };
    }
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });
    console.log('crete', user);
    if (user) {
      throw new ApiException('用户已存在', ApiErrorCode.ERR_USER_EXIST);
    } else {
      const data = {
        ...createUserDto,
      };
      return this.prisma.user.create({ data: data });
    }
  }
}
