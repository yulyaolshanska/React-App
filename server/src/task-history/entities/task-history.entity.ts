import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity({ name: 'task-history' })
export class TaskHistory {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  action: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  user: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @ManyToOne(() => Task)
  @ApiProperty()
  @JoinColumn({ name: 'task_id' })
  task: Task;
}
