import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../baseClass/base';
// import { ApiProperty } from '@nestjs/swagger';

/**
 * 用户扩展表(展示和一些相关字段)
 */
@Entity('userExtend')
export class UserExtend extends Base {
  @Index()
  @Column({ comment: '用户id' })
  // @ApiProperty({ description: '用户id' })
  userId: string;

  // @Column({ type: 'float8', comment: '已换汇总和', default: 0 })
  // // @ApiProperty({ description: '已换汇总和' })
  // sumFxAmount: number;

  // @Column({ type: 'float8', default: 0, comment: '充值总和' })
  // // @ApiProperty({ description: '充值总和' })
  // depositSum: number;

  @Column({ default: 'V1', comment: 'vip等级' })
  // @ApiProperty({ description: 'vip等级' })
  vipLevel: string;

  @Column({ type: 'float8', default: 0, comment: '成长值' })
  // @ApiProperty({ description: '成长值' })
  growthValue: number;
}
