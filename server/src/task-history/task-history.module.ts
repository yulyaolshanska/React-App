import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistory } from './entities/task-history.entity';
import { TaskHistoryService } from './task-history.service';
import { TaskHistoryController } from './task-history.controller';
import { TaskModule } from '../tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskHistory]),
    forwardRef(() => TaskModule),
  ],
  exports: [TypeOrmModule],
  providers: [TaskHistoryService],
  controllers: [TaskHistoryController],
})
export class TaskHistoryModule {}
