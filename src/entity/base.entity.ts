import { Column, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

/**
* 表基类
*/
export class Base {

  @ApiProperty({ description: 'id' })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ description: '创建时间' })
  @Column({ name: 'create_time' })
  createTime: Date;

  @ApiProperty({ description: '更新时间' })
  @Column({ name: 'update_time' })
  updateTime: Date;
}