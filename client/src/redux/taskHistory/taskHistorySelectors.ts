import { RootState } from "../store";

export const selectTaskHistory = (state: RootState) =>
  state.taskHistory.taskHistory;
export const selectTaskHistoryLoading = (state: RootState) =>
  state.taskHistory.loading;
export const selectTaskHistoryError = (state: RootState) =>
  state.taskHistory.error;
