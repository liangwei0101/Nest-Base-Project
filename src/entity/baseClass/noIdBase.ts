import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, Column } from 'typeorm';

/**
 * 无id的基类
 */
@ObjectType()
export class NoIdBase {

  @Field({ nullable: true, description: 'createTime' })
  @CreateDateColumn()
  createTime: Date;

  @Field({ nullable: true, description: 'updateTime' })
  @UpdateDateColumn()
  updateTime: Date;

  @Field({ nullable: true, description: 'deleteTime' })
  @DeleteDateColumn({ select: false })
  deleteTime: Date;

  @Field({ nullable: true, description: 'version' })
  @VersionColumn({ select: false })
  version: number;

  @Field({ nullable: true, description: '备注' })
  @Column({ comment: '备注', nullable: true })
  remarks: string;
}
