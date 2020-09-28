import { IsString, IsNotEmpty, isEmail, IsEmail } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { IdArgInput } from '../../common/class/graphql/IdArg.input';

export class CreateUserDto {
  @IsNotEmpty({ message: 'account is null' })
  @IsString({ message: 'account is to require' })
  account: string;

  @IsNotEmpty({ message: 'name is null' })
  @IsString({ message: 'name is not null and is a string' })
  name: string;
}
export class LoginDto {
  @IsString({ message: 'account is to require' })
  account: string;

  @IsString({ message: 'password is to require' })
  password: string;
}

export class SignUpStep1Dto {
  @IsNotEmpty({ message: 'phone is to require' })
  @IsString({ message: 'phone is to require' })
  phone: string;

  @IsNotEmpty({ message: 'nickname is to require' })
  @IsString({ message: 'nickname is to require' })
  nickname: string;

  @IsNotEmpty({ message: 'password is to require' })
  @IsString({ message: 'password is to require' })
  password: string;
}

/**
 * 更新用户输入字段
 */
@InputType()
export class UserInput extends IdArgInput {
  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  paymentPassword: string;

  @Field({ nullable: true })
  role: number;

  @Field({ nullable: true })
  nickname: string;

  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  manageUserId: string;

  @Field({ nullable: true })
  remarks: string;
}