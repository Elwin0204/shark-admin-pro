import { Injectable } from '@nestjs/common';
import { RouteDto } from './dto/route.dto';

@Injectable()
export class PermService {
  constructor() {}

  async findUserPerms(username: string): Promise<RouteDto[]> {
    return [];
  }
}
