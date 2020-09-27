import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * 表基类
 */
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '备注', nullable: true })
  remarks: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @DeleteDateColumn({ select: false })
  deleteTime: Date;

  @VersionColumn({ select: false })
  version: number;
}
