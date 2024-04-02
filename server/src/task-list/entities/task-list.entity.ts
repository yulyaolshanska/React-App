import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column('float', { nullable: true })
  @ApiProperty()
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  @ApiProperty()
  task: Task[];
}
