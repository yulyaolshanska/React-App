import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { TaskHistoryService } from '../task-history/task-history.service';
import { Priority } from '../constants/enums/priority.enum';
import { TaskListService } from '../task-list/task-list.services';
import { TaskList } from '../task-list/entities/task-list.entity';
import { TaskHistory } from '../task-history/entities/task-history.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    @InjectRepository(TaskHistory)
    private readonly taskHistoryRepository: Repository<TaskHistory>,

    private readonly taskHistoryService: TaskHistoryService,
    private readonly taskListService: TaskListService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { columnId, ...taskData } = createTaskDto;
    const column = await this.taskListRepository.findOne({
      where: { id: columnId },
    });

    if (!column) {
      throw new Error(`TaskList with ID ${columnId} not found`);
    }

    let tasksInTargerColumn = await (
      await this.taskRepository.find({ relations: ['column'] })
    )
      .filter((t: Task) => t.column.id == columnId)
      .sort((prev: Task, curr: Task) => prev.position - curr.position);
    let targetPos =
      tasksInTargerColumn.length > 0 ? tasksInTargerColumn[0].position + 1 : 1;
    taskData.position = targetPos;
    const newTask = this.taskRepository.create({ ...taskData, column });

    return this.taskRepository.save(newTask);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['column', 'taskHistory'] });
  }

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['column'],
    });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    const oldDescription = task.description;
    const oldTitle = task.title;
    const oldDueDate = task.due_date;
    const oldPriority = task.priority;
    const oldColumnId = task.column?.id;

    const taskHistory = await this.taskHistoryRepository.find({
      where: { task: { id: id } },
      relations: ['task'],
    });

    const column = await this.taskListRepository.findOne({
      where: { id: updateTaskDto.columnId },
    });

    if (!column) {
      throw new Error(`TaskList with ID ${updateTaskDto.columnId} not found`);
    }

    const newTask = {
      ...task,
      ...updateTaskDto,
      column,
      taskHistory: taskHistory,
    };
    const updatedTask = await this.taskRepository.save(newTask);

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
      const taskList = await this.taskListService.getTaskListById(
        updatedTask.column?.id,
      );
      await this.taskHistoryService.logTaskMovement(
        updatedTask.id,
        'username',
        taskList.title,
      );
    }

    if (
      oldDueDate.toISOString() !== new Date(updatedTask.due_date).toISOString()
    ) {
      await this.taskHistoryService.logTaskDueDateUpdate(
        updatedTask.id,
        'username',
        new Date(updatedTask.due_date),
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
    await this.taskHistoryRepository.delete({ task: { id } });
    await this.taskRepository.delete(id);
  }
}
