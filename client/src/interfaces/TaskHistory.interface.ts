import { Task } from "./Task";

export interface TaskHistory {
  id: number;
  action: string;
  user: string;
  created_at: Date;
  task: Task;
}
