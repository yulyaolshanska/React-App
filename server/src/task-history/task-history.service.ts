import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { TaskHistoryDto } from './dto/task-history.dto';
import { TaskHistory } from './entities/task-history.entity';

@Injectable()
export class TaskHistoryService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskHistory)
    private taskHistoryRepository: Repository<TaskHistory>,
  ) {}

  async create(taskHistoryDto: TaskHistoryDto) {
    const task = await this.taskRepository.findOne({
      where: { id: taskHistoryDto.task_id },
      relations: ['column'],
    });

    const newChanges = this.taskHistoryRepository.create({
      ...taskHistoryDto,
      task: task,
    });
    const savedChanges = await this.taskHistoryRepository.save({
      ...newChanges,
    });

    return savedChanges;
  }

  async findAllByTaskId(id: number) {
    return await this.taskHistoryRepository.find({
      where: { task: { id: id } },
      relations: ['task'],
    });
  }

  async logTaskAction(action: string, taskId: number, username: string) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    const newChange = new TaskHistory();
    newChange.action = action;
    newChange.user = username;
    newChange.created_at = new Date();
    newChange.task = task;

    return this.taskHistoryRepository.save(newChange);
  }

  async logTaskCreation(taskId: number, username: string) {
    return this.logTaskAction('Create', taskId, username);
  }

  async logTaskRenaming(taskId: number, username: string, newName: string) {
    return this.logTaskAction(`Rename to '${newName}'`, taskId, username);
  }

  async logTaskDescriptionUpdate(
    taskId: number,
    username: string,
    newDescription: string,
  ) {
    return this.logTaskAction(
      `Update description to '${newDescription}'`,
      taskId,
      username,
    );
  }

  async logTaskDueDateUpdate(
    taskId: number,
    username: string,
    newDueDate: Date,
  ) {
    return this.logTaskAction(
      `Update due date to '${newDueDate.toISOString()}'`,
      taskId,
      username,
    );
  }

  async logTaskMovement(taskId: number, username: string, newColumn: string) {
    return this.logTaskAction(
      `Move to '${newColumn} column'`,
      taskId,
      username,
    );
  }

  async logTaskPriorityUpdate(
    taskId: number,
    username: string,
    newPriority: string,
  ) {
    return this.logTaskAction(
      `Update priority to '${newPriority}'`,
      taskId,
      username,
    );
  }
}
