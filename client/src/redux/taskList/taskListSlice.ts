import { createSlice } from "@reduxjs/toolkit";
import { TaskList } from "../../interfaces/ TaskList.interface";
import {
  addTaskList,
  deleteTaskList,
  fetchTaskLists,
  updateTaskList,
} from "./ taskListAsyncThunk";

interface TaskListState {
  taskLists: TaskList[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskListState = {
  taskLists: [],
  loading: false,
  error: null,
};

const taskListSlice = createSlice({
  name: "taskLists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskLists.fulfilled, (state, action) => {
        state.loading = false;
        state.taskLists = action.payload;
      })
      .addCase(fetchTaskLists.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "An error occurred while fetching task lists";
      })
      .addCase(addTaskList.fulfilled, (state, action) => {
        state.taskLists.push(action.payload);
      })
      .addCase(updateTaskList.fulfilled, (state, action) => {
        const updatedTaskList = action.payload;
        const index = state.taskLists.findIndex(
          (taskList) => taskList.id === updatedTaskList.id
        );
        if (index !== -1) {
          state.taskLists[index] = updatedTaskList;
        }
      })
      .addCase(deleteTaskList.fulfilled, (state, action) => {
        state.taskLists = state.taskLists.filter(
          (taskList) => taskList.id !== action.payload
        );
      });
  },
});

export default taskListSlice.reducer;
