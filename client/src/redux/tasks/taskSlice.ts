import { createSlice } from "@reduxjs/toolkit";
import { TaskState } from "../../interfaces/TaskState";
import { fetchTasks, addTask, updateTask, deleteTask } from "./taskAsyncThunk";

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "An error occurred";
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
  },
});

export default taskSlice.reducer;
