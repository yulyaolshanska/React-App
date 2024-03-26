import { Module } from '@nestjs/common';
import { TaskList } from './entities/task-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.services';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
