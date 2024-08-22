import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色编码' })
  @IsNotEmpty({ message: '角色编码必填' })
  readonly code: string;

  @ApiProperty({ description: '角色名称' })
  @IsNotEmpty({ message: '角色名称必填' })
  readonly name: string;

  @ApiProperty({ description: '排序' })
  readonly sort?: number;

  @ApiProperty({ description: '状态' })
  readonly status?: number;

  @ApiProperty({ description: '是否删除' })
  readonly is_deleted?: number;

  @ApiProperty({ description: '创建人' })
  readonly create_by?: string;

  @ApiProperty({ description: '更新人' })
  readonly update_by?: string;
}
