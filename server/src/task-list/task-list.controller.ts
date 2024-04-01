import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TaskListService } from './task-list.services';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';

@Controller('api/task-list')
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskListDto: UpdateTaskListDto,
  ) {
    return this.taskListService.updateTaskList(+id, updateTaskListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListService.removeTaskList(+id);
  }
}
