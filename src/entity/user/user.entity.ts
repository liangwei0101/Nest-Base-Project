import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { NoIdBase } from '../baseClass/noIdBase';
import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * 用户
 */
@ObjectType()
@Entity('user')
export class User extends NoIdBase {
  @Field({ nullable: true, description: 'id' })
  @PrimaryColumn()
  id: string;

  @Index({})
  @Field({ nullable: true })
  @Column({ comment: 'name', nullable: true })
  name: string;

  @Index({ unique: true })
  @Field({ nullable: true })
  @Column({ comment: '手机号码', nullable: true })
  phone: string;

  @Field({ nullable: true })
  @Column({ comment: '角色id', nullable: true })
  roleNo: string;

  @Field({ nullable: true })
  @Column({ default: false, comment: '是否锁定' })
  locked: boolean;

  @Field({ nullable: true })
  @Index({ unique: true })
  @Column({ comment: '邮箱', nullable: true })
  email: string;

  rolesList: string[];
}
