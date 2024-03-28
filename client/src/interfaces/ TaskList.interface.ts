import { Task } from "./Task";

export interface TaskList {
  id: number;
  title: string;
  position?: number | null;
  created_at: Date;
  updated_at: Date;
  task: Task[];
}
