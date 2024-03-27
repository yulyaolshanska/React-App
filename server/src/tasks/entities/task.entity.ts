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
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('float', { nullable: true })
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  due_date: Date;

  @Column({ type: 'enum', enum: Priority, default: Priority.LOW })
  priority: Priority;

  @ManyToOne(() => TaskList, (taskList) => taskList.task)
  @JoinColumn({ name: 'column_id' })
  column: TaskList;
}
