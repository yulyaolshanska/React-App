import { Task } from "./Task";

export interface TaskList {
  id: number;
  title: string;
  position: number;
  created_at: Date;
  updated_at: Date;
  task: Task[];
}
