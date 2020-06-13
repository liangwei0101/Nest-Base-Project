import { Column, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

/**
* 表基类
*/
export class Base {

  @ApiProperty({ description: 'id' })
  @PrimaryColumn({ comment: 'id' })
  id: string;

  @ApiProperty({ description: '创建时间' })
  @Column({ comment: '创建时间' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  @Column({ comment: '更新时间' })
  updateTime: Date;
}