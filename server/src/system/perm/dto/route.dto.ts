import { ApiProperty } from '@nestjs/swagger';
import { $enum } from 'ts-enum-util';
import { RouterMethod } from '../../../common/enums/router-method.enum';

export class RouteDto {
  /** 路由 path */
  @ApiProperty({ description: 'api 路径' })
  path: string;
  /** 路由方法 */
  @ApiProperty({
    description: 'api 方法',
    enum: $enum(RouterMethod).getValues(),
  })
  method: RouterMethod;
  /** 路由描述 */
  @ApiProperty({ description: 'api 描述说明', required: false })
  desc?: string;
}
