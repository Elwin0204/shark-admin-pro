import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { UserModule } from './system/user/user.module';
import { RoleModule } from './system/role/role.module';
import { MenuModule } from './system/menu/menu.module';
import configuration from './config/index';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
