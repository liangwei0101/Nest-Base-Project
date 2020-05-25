import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {

  @IsString({ message: 'parameter is to require' })
  @ApiProperty({ description: '用户账户', required: true })
  account: string;

  @IsString({ message: 'parameter is to require' })
  @ApiProperty({ description: '用户名称', required: true })
  name: string;
}