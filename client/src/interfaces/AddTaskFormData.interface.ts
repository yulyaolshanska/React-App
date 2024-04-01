import { Priority } from "./Task";

export interface AddTaskFormData {
  title: string;
  description: string;
  due_date: Date;
  priority: Priority;
  columnId: number;
}
