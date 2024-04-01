import { Task } from "./Task";

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
