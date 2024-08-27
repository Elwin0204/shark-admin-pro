import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    console.log('API_BASE_URL', this.configService.get('API_BASE_URL'));
    console.log('JWT_SECRET', this.configService.get('JWT_SECRET'));
    return this.appService.getHello();
  }
}
