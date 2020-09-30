import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * 表基类
 */
@ObjectType()
export class Base {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ comment: '备注', nullable: true })
  remarks: string;

  @Field({ nullable: true })
  @CreateDateColumn()
  createTime: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updateTime: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ select: false })
  deleteTime: Date;

  @Field({ nullable: true })
  @VersionColumn({ select: false })
  version: number;
}
