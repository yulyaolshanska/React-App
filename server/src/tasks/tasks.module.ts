import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistoryModule } from 'src/task-history/task-history.module';
import { TaskHistoryService } from 'src/task-history/task-history.service';
import { TaskListModule } from 'src/task-list/task-list.module';
import { TaskListService } from 'src/task-list/task-list.services';
import { Task } from './entities/task.entity';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => TaskHistoryModule),
    forwardRef(() => TaskListModule),
  ],
  exports: [TypeOrmModule],
  controllers: [TaskController],
  providers: [TaskService, TaskHistoryService, TaskListService],
})
export class TaskModule {}
