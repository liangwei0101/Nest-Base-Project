import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @ApiProperty({ description: '用户账户', required: true })
  account: string;

  @Column()
  @ApiProperty({ description: '用户名称', required: true })
  name: string;

  
  @Column()
  @ApiProperty({ description: '用户密码', required: true })
  password: string
}