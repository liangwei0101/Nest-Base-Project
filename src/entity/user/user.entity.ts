import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from '../baseClass/base';
import { UserConfig } from './user.config.entity';

/**
 * 用户
 */
@ObjectType()
@Entity('user')
export class User extends Base {

  @Index({})
  @Field({ nullable: true, description: 'name' })
  @Column({ comment: 'name', nullable: true })
  name: string;

  @Index({ unique: true })
  @Field({ nullable: true, description: '手机号码' })
  @Column({ comment: '手机号码', nullable: true })
  phone: string;

  @Field({ nullable: true, description: '角色编号' })
  @Column({ comment: '角色编号', nullable: true })
  roleNo: string;

  @Field({ nullable: true })
  @Column({ default: false, comment: '是否锁定' })
  locked: boolean;

  @Field({ nullable: true })
  @Index({ unique: true })
  @Column({ comment: '邮箱', nullable: true })
  email: string;

  rolesList: string[];

  //#region 

  /**
   * 子域挂载的时候一定要写这个要不然会报
   *  Error: Undefined type error. Make sure you are providing an explicit type for the "userConfig" of the "UserResolver" class.
  */
  @Field(() => UserConfig, { nullable: true })
  userConfig: UserConfig;
}
