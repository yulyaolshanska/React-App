import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskHistory } from "../../interfaces/TaskHistory.interface";

export const fetchTaskHistory = createAsyncThunk<TaskHistory[], number>(
  "taskHistory/fetchTaskHistory",
  async (taskId: number) => {
    const response = await fetch(`/api/task-history/${taskId}`);
    const data = await response.json();
    return data;
  }
);
