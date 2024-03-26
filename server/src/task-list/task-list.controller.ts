import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TaskListService } from './task-list.services';
import { CreateTaskListDto } from './dto/create-task-list.dto';

@Controller('/task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  create(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskListService.createTaskList(createTaskListDto);
  }

  @Get()
  findAll() {
    return this.taskListService.getAllTaskLists();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListService.removeTaskList(+id);
  }
}
