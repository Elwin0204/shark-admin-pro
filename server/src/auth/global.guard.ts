import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

const urlList = [];

@Injectable()
export class GlobalGuard implements NestInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const url = request.url;
    if (!urlList.includes(url)) {
      const valid = this.authService.validateToken(token);
      if (!valid) {
        return next.handle().pipe(
          map(() => {
            return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
          }),
        );
      }
    }
    return next.handle();
  }
}
