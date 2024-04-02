import { Priority } from "./Task";

export interface UpdateTaskFormData {
  title?: string;
  description?: string;
  due_date?: Date;
  priority?: Priority;
  columnId: number;
}
