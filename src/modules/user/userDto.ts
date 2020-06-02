import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {

  @IsString({ message: 'account is to require' })
  @ApiProperty({ description: '用户账户', required: true })
  account: string;

  @IsString({ message: 'name is to require' })
  @ApiProperty({ description: '用户名称', required: true })
  name: string;
}
export class LoginDto {

  @IsString({ message: 'account is to require' })
  @ApiProperty({ description: '用户账户', required: true })
  account: string

  @IsString({ message: 'password is to require' })
  @ApiProperty({ description: '用户密码', required: true })
  password: string
}