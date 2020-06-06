import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @ApiProperty({ description: '角色编号', required: true })
  no: number

  @Column()
  @ApiProperty({ description: '角色名称', required: true })
  name: string;
}