import { ActivationStatusEnum } from '../../common/enum/common.enum';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { NoIdBase } from '../baseClass/noIdBase';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * 系统配置表
 */
@ObjectType()
@Entity('systemConfig')
export class SystemConfig extends NoIdBase {
  @Field({ nullable: true, description: 'id' })
  @PrimaryColumn('int', { generated: true })
  id: number;

  @Index()
  @Column({ comment: '字典key' })
  key: string;

  @Column({ comment: 'value' })
  value: string;

  @Column({ comment: '类型', nullable: true })
  type: string;

  @Column({ comment: '状态(-1：不启用；0：禁用；1：启用)', nullable: true, default: ActivationStatusEnum.Active })
  status: ActivationStatusEnum;

  @Column({ type: 'boolean', comment: '是否开放给用户' })
  visibleToUser: boolean;
}
