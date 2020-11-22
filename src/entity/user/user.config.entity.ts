import { Entity, Column, Index } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Base } from '../baseClass/base';
import { FeeEnum } from '../../common/enum/common.enum';

/**
 * 用户
 */
@ObjectType()
@Entity('userConfig')
export class UserConfig extends Base {

  @Index()
  @Field({ nullable: true })
  @Column({ comment: '用户id' })
  userId: string;

  @Field({ nullable: true })
  @Column({ type: 'float8', default: 0, comment: 'fee' })
  fee: number;

  @Field(() => String, { nullable: true, })
  @Column({ type: 'text', comment: 'fee' })
  feeType: FeeEnum
}
