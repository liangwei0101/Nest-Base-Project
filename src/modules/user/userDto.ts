import { IsString } from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IdArgInput } from '../../common/class/graphql/IdArg.input';
import { Pagination } from '../../common/class/pagination';
import { User } from '../../entity/user/user.entity';


@ObjectType()
export class UsersOutput extends Pagination<User> {
  @Field(() => [User])
  public data: User[];
}

export class LoginDto {
  @IsString({ message: 'account is to require' })
  account: string;

  @IsString({ message: 'password is to require' })
  password: string;
}

/**
 * 更新用户输入字段
 */
@InputType()
export class UserInput extends IdArgInput {
  @Field({ nullable: true, description: '手机号' })
  phone: string;

  @Field({ nullable: true, description: 'name' })
  name: string;

  @Field({ nullable: true, description: '邮箱' })
  email: string;
}