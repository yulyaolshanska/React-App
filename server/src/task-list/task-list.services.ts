import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskHistory } from '../task-history/entities/task-history.entity';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskList } from './entities/task-list.entity';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskHistory)
    private readonly taskHistoryRepository: Repository<TaskHistory>,
  ) {}

  async createTaskList(
    createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    const taskLists = await this.taskListRepository.find();
    let targetPos = taskLists.length > 0 ? taskLists.length + 1 : 1;
    const taskList = this.taskListRepository.create({
      ...createTaskListDto,
      position: targetPos,
    });

    return this.taskListRepository.save(taskList);
  }

  async getAllTaskLists(): Promise<TaskList[]> {
    return this.taskListRepository.find({
      relations: ['task'],
    });
  }

  getTaskListById(id: number) {
    return this.taskListRepository.findOne({
      where: { id },
    });
  }

  async updateTaskList(id: number, updateTaskListDto: UpdateTaskListDto) {
    try {
      const list = await this.taskListRepository.findOneOrFail({
        where: { id },
      });

      Object.assign(list, updateTaskListDto);

      return await this.taskListRepository.save(list);
    } catch (err) {
      console.log('err', err);
    }
  }

  async removeTaskList(id: number) {
    const tasks = await this.taskRepository.find({ where: { column: { id } } });

    for (const task of tasks) {
      await this.taskHistoryRepository.delete({ task: { id: task.id } });
    }

    await this.taskRepository.delete({ column: { id } });

    await this.taskListRepository.delete(id);
  }
}
