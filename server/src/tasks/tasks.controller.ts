import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(Number(id), updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.removeTask(+id);
  }
}
