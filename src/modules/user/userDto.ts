import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ description: '用户账户', required: true })
  account: string;

  @ApiProperty({ description: '用户名称', required: true })
  name: string;
}