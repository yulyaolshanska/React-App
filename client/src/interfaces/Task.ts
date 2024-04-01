import { TaskHistory } from "./TaskHistory.interface";

export interface Task {
  id: number;
  title: string;
  description: string;
  position: number;
  column: {
    id: number;
    title: string;
    position: number;
    updated_at: Date;
    created_at: Date;
  };
  created_at?: Date;
  updated_at?: Date;
  due_date: Date;
  priority: Priority;
  taskHistory: TaskHistory[];
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
