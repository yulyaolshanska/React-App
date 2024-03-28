import { ApiProperty } from '@nestjs/swagger';
import { Priority } from 'src/constants/enums/priority.enum';
import { TaskList } from 'src/task-list/entities/task-list.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  description: string;

  @Column('float', { nullable: true })
  @ApiProperty()
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  due_date: Date;

  @Column({ type: 'enum', enum: Priority, default: Priority.LOW })
  @ApiProperty()
  priority: Priority;

  @ManyToOne(() => TaskList, (taskList) => taskList.task)
  @JoinColumn({ name: 'column_id' })
  @ApiProperty()
  column: TaskList;
}
