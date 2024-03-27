import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { TaskHistoryService } from 'src/task-history/task-history.service';
import { Priority } from 'src/constants/enums/priority.enum';
import { TaskListService } from 'src/task-list/task-list.services';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly taskHistoryService: TaskHistoryService,
    private readonly taskListService: TaskListService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
    });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    const oldDescription = task.description;
    const oldTitle = task.title;
    const oldPosition = task.position;
    const oldDueDate = task.due_date;
    const oldPriority = task.priority;
    const oldColumnId = task.column?.id;

    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepository.save(task);

    if (oldDescription !== updatedTask.description) {
      await this.taskHistoryService.logTaskDescriptionUpdate(
        updatedTask.id,
        'username',
        updatedTask.description,
      );
    }

    if (oldTitle !== updatedTask.title) {
      await this.taskHistoryService.logTaskRenaming(
        updatedTask.id,
        'username',
        updatedTask.title,
      );
    }

    if (oldColumnId !== updatedTask.column?.id) {
      const newColumnIdString = updatedTask.column?.id.toString();
      await this.taskHistoryService.logTaskMovement(
        updatedTask.id,
        'username',
        newColumnIdString,
      );
    }
    if (oldPosition !== updatedTask.position) {
      const taskList = await this.taskListService.getTaskListById(
        updatedTask.column?.id,
      );
      await this.taskHistoryService.logTaskMovement(
        updatedTask.id,
        'username',
        taskList.title,
      );
    }

    if (oldDueDate.toISOString() !== updatedTask.due_date.toISOString()) {
      await this.taskHistoryService.logTaskDueDateUpdate(
        updatedTask.id,
        'username',
        updatedTask.due_date,
      );
    }

    if (oldPriority !== updatedTask.priority) {
      const newPriority = Priority[updatedTask.priority];
      await this.taskHistoryService.logTaskPriorityUpdate(
        updatedTask.id,
        'username',
        newPriority,
      );
    }

    return updatedTask;
  }

  async removeTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
