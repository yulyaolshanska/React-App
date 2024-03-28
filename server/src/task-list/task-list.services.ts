import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskList } from './entities/task-list.entity';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async createTaskList(
    createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    const taskList = this.taskListRepository.create({ ...createTaskListDto });
    return this.taskListRepository.save(taskList);
  }

  async getAllTaskLists(): Promise<TaskList[]> {
    return this.taskListRepository.find();
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
    await this.taskListRepository.delete(id);
  }
}
