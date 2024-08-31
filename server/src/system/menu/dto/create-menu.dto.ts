import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: '父id' })
  readonly parent_id?: string;

  @ApiProperty({ description: '名称' })
  @IsNotEmpty({ message: '名称必填' })
  readonly name?: string;

  @ApiProperty({ description: '菜单类型' })
  @IsNotEmpty({ message: '菜单类型必填' })
  readonly type: string;

  @ApiProperty({ description: '路由名称' })
  readonly route_name?: string;

  @ApiProperty({ description: '路由路径' })
  readonly route_path?: string;

  @ApiProperty({ description: '组件路径（组件页面完整路径，相对于 src/views/' })
  readonly component?: string;

  @ApiProperty({ description: '按钮编码' })
  readonly btn_code?: string;

  @ApiProperty({
    description: '【目录】只有一个子路由是否始终显示（1-是 0-否）',
  })
  readonly always_show?: number;

  @ApiProperty({ description: '【菜单】是否开启页面缓存（1-是 0-否）' })
  readonly keep_alive?: number;

  @ApiProperty({ description: '是否隐藏（1-隐藏 0-显示）' })
  readonly hidden?: number;

  @ApiProperty({ description: '排序' })
  readonly sort?: number;

  @ApiProperty({ description: '图标' })
  readonly icon?: string;

  @ApiProperty({ description: '重定向url' })
  readonly redirect?: string;

  @ApiProperty({ description: '创建人' })
  readonly create_by?: string;

  @ApiProperty({ description: '更新人' })
  readonly update_by?: string;
}
