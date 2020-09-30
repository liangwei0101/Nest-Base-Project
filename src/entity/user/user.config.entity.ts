import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../baseClass/base';
import { ObjectType, Field } from '@nestjs/graphql';

/**
 * 用户
 */
@ObjectType()
@Entity('userConfig')
export class UserConfig extends Base {

  @Index()
  @Column({ comment: '用户id' })
  userId: string;

  @Column({ type: 'boolean', default: false, comment: '是否开通极速换汇' })
  ableTrade: boolean;
}
