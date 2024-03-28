import { RootState } from "../store";

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectTasksLoading = (state: RootState) => state.tasks.loading;

export const selectTasksError = (state: RootState) => state.tasks.error;
