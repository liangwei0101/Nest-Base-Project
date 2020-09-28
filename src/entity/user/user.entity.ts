import { Column, Entity, Index, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
import { NoIdBase } from '../baseClass/noIdBase';
import { Balance } from '../balance/balance.entity';
import { UserExtend } from './user.extend.entity';
import { UserConfig } from './user.config.entity';
import { UserCoupon } from '../coupon/coupon.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * 账户类型
 */
export enum AccountType {
  individual_mainland = 'individual_mainland',
  corp_mainland = 'corp_mainland',
  corp_hk = 'corp_hk',
  individual_hk = 'individual_hk',
}

/**
 * 用户
 */
@ObjectType()
@Entity('user')
export class User extends NoIdBase {
  @Field({ nullable: true, description: '我是测试' })
  @PrimaryColumn()
  // @ApiProperty({ description: 'id' })
  id: string;

  @Index({ unique: true })
  @Field({ nullable: true })
  @Column({ comment: '手机号码', nullable: true })
  // @ApiProperty({ description: '手机号码' })
  phone: string;

  // @ApiProperty({ description: 'roleId', nullable: true })
  @Column({ comment: '角色id', nullable: true })
  roleId: string;

  @Column({ comment: '用户密码', select: false, nullable: true })
  // @ApiProperty({ description: '用户密码' })
  password: string;

  @Column({ comment: '用户支付密码', select: false, nullable: true })
  // @ApiProperty({ description: '用户支付密码' })
  paymentPassword: string;

  @Column({ default: false, comment: '是否锁定' })
  // @ApiProperty({ description: '是否锁定' })
  locked: boolean;

  @Column({ default: '300', comment: '用户角色' })
  // @ApiProperty({ description: '用户角色' })
  role: string;

  @Field({ nullable: true })
  @Column({ comment: '昵称', nullable: true })
  // @ApiProperty({ description: '昵称' })
  nickname: string;

  @Index({ unique: true })
  @Column({ comment: '邮箱', nullable: true })
  // @ApiProperty({ description: '邮箱' })
  email: string;

  @Column({ comment: '自身邀请码', nullable: true })
  // @ApiProperty({ description: '自身邀请码' })
  inviteCode: string;

  @Column({ comment: '邀请人id', nullable: true })
  // @ApiProperty({ description: '邀请人id', nullable: true })
  inviteId: string;

  // @ApiProperty({ description: '管理人id', nullable: true })
  @Column({ comment: '管理人id', nullable: true })
  manageUserId: string;

  @Column({ comment: '账户类型', default: AccountType.individual_mainland })
  // @ApiProperty({ description: '账户类型' })
  accountType: AccountType;

  @Column({ comment: '用户来源', nullable: true })
  // @ApiProperty({ description: '用户来源', nullable: true })
  userSource: string;

  @Column({ type: 'int', default: 1, comment: '注册进度' })
  // @ApiProperty({ description: '注册进度' })
  signUpProgress: number;

  @Column({ comment: '备注', nullable: true })
  // @ApiProperty({ description: '备注', nullable: true })
  remarks: string;

  @Column({ default: true, comment: '是否为主账户' })
  // @ApiProperty({ description: '是否为主账户' })
  isMaster: boolean;

  @Column({ comment: '父账户id', nullable: true })
  // @ApiProperty({ description: '父账户id' })
  parentId: string;

  // @ApiProperty({ description: '角色列表' })
  rolesList: string[];

  //#region graphql接口

  @Field(() => UserConfig, { nullable: true })
  userConfig: UserConfig;

  //#endregion
}
