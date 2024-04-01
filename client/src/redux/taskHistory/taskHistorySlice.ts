import { createSlice } from "@reduxjs/toolkit";
import { TaskHistory } from "../../interfaces/TaskHistory.interface";
import { fetchTaskHistory } from "./taskHistoryAsyncThunk";

interface TaskHistoryState {
  taskHistory: TaskHistory[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskHistoryState = {
  taskHistory: [],
  loading: false,
  error: null,
};

const taskHistorySlice = createSlice({
  name: "taskHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.taskHistory = action.payload;
      })
      .addCase(fetchTaskHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const taskHistoryActions = taskHistorySlice.actions;
export const taskHistoryReducer = taskHistorySlice.reducer;
