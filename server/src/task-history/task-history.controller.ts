import { Controller, Get, Param } from '@nestjs/common';
import { TaskHistoryService } from './task-history.service';

@Controller('api/task-history')
export class TaskHistoryController {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}

  @Get(':taskId')
  async getTaskHistory(@Param('taskId') taskId: number) {
    return this.taskHistoryService.findAllByTaskId(taskId);
  }
}
