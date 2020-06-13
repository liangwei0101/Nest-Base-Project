import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from './base.entity';
import { type } from 'os';

@Entity('user')
export class User extends Base {

  @Column({ comment: '手机号码' })
  @ApiProperty({ description: '手机号码' })
  phone: string;

  @Column({ comment: '用户密码' })
  @ApiProperty({ description: '用户密码' })
  password: string;

  @Column({ comment: '用户支付密码' })
  @ApiProperty({ description: '用户支付密码' })
  paymentPassword: string

  @Column({ default: false, comment: '是否锁定' })
  @ApiProperty({ description: '是否锁定' })
  locked: boolean

  @Column({ default: '300', comment: '用户角色' })
  @ApiProperty({ description: '用户角色' })
  role: string

  @Column({ comment: '昵称' })
  @ApiProperty({ description: '昵称' })
  nickname: string;

  @Column({ comment: '认证名称' })
  @ApiProperty({ description: '认证名称' })
  verifiedName: string

  @Column({ comment: '邮箱' })
  @ApiProperty({ description: '邮箱' })
  email: string

  @Column({ comment: '自身邀请码' })
  @ApiProperty({ description: '自身邀请码' })
  inviteCode: string

  @Column({ comment: '邀请人id', nullable: true })
  @ApiProperty({ description: '邀请人id', nullable: true })
  inviteId: string

  @ApiProperty({ description: '管理人id', nullable: true })
  @Column({ comment: '管理人id', nullable: true })
  manageUserId: string

  @Column({ type: "enum", enum: ['individual_mainland', 'corp_mainland', 'corp_hk', 'individual_hk'], comment: '账户类型' })
  @ApiProperty({ description: '账户类型' })
  accountType: AccountType

  @Column({ comment: '用户来源', nullable: true })
  @ApiProperty({ description: '用户来源', nullable: true })
  userSource: string

  @Column({ type: 'int', default: 1, comment: '注册进度' })
  @ApiProperty({ description: '注册进度' })
  signUpProgress: number

  @Column({ comment: '备注', nullable: true })
  @ApiProperty({ description: '备注', nullable: true })
  remarks: string
}

export enum AccountType {
  individual_mainland = 'individual_mainland',
  corp_mainland = 'corp_mainland',
  corp_hk = 'corp_hk',
  individual_hk = 'individual_hk',
}