import { Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { NoIdBase } from '../baseClass/noIdBase';

/**
 * 系统字典表
 */
@Entity('systemDictionary')
export class SystemDictionary extends NoIdBase {
  @PrimaryColumn('int', { generated: true })
  id: number;

  @Index()
  @Column({ comment: '字典key' })
  key: string;

  @Column({ comment: '类型' })
  type: string;

  @Column({ comment: 'value' })
  value: string;

  @Column({ comment: '父id', nullable: true })
  parentId: string;

  @Column({ comment: '备注', nullable: true })
  remarks: string;
}
