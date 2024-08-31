import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账户名称' })
  @IsNotEmpty({ message: '账户名称必填' })
  readonly username: string;

  @ApiProperty({ description: '昵称' })
  readonly nickname?: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string;

  @ApiProperty({ description: '部门id' })
  readonly dept_id?: number;

  @ApiProperty({ description: '手机号' })
  readonly mobile?: string;

  @ApiProperty({ description: '删除标识' })
  readonly is_deleted?: number;

  @ApiProperty({ description: '状态' })
  readonly status?: number;

  @ApiProperty({ description: '创建人' })
  readonly create_by?: string;
  @ApiProperty({ description: '更新人' })
  readonly update_by?: string;
}
