import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalGuard } from './auth/global.guard';
// import { AuthService } from './auth/auth.service';

const envFilePath = [`.${process.env.NODE_ENV || 'development'}.env`, '.env'];
console.log('env:', process.env.NODE_ENV);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    MenuModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: GlobalGuard }],
})
export class AppModule {}
