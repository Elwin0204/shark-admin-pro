import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '用户名' })
  username: string;
}
