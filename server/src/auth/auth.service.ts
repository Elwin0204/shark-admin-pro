import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(userInfo: CreateTokenDto) {
    return {
      access_token: this.jwtService.sign(userInfo),
    };
  }

  validateToken(token) {
    if (!token) {
      return false;
    }
    try {
      return this.jwtService.verify(token);
    } catch {
      return false;
    }
  }
}
