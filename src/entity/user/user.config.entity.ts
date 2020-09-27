import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../baseClass/base';
import { ObjectType, Field } from '@nestjs/graphql';

/**
 * 用户
 */
@ObjectType()
@Entity('userConfig')
export class UserConfig extends Base {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ comment: '用户id' })
  userId: string;

  @Column({ type: 'float8', comment: '换汇限额', default: 500000 })
  fxOrPaymentLimit: number;

  @Column({ type: 'boolean', default: false, comment: '交易二次验证' })
  isStartDoubleValidation: boolean;

  @Column({ type: 'boolean', default: false, comment: '是否开通极速换汇' })
  ableFastFxTrade: boolean;
}
