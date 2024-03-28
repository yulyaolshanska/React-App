import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { TaskList } from "../../interfaces/ TaskList.interface";

export const fetchTaskLists = createAsyncThunk<TaskList[]>(
  "taskLists/fetchTaskLists",
  async () => {
    const response = await fetch(`${BASE_URL}/task-list`);
    const data = await response.json();
    return data;
  }
);

export const addTaskList = createAsyncThunk<TaskList>(
  "taskLists/addTaskList",
  async (newTaskList) => {
    const response = await fetch(`${BASE_URL}/task-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskList),
    });
    const data = await response.json();

    return data;
  }
);

export const updateTaskList = createAsyncThunk<
  TaskList,
  { id: number; updatedTaskList: TaskList }
>("taskLists/updateTaskList", async ({ id, updatedTaskList }) => {
  const response = await fetch(`${BASE_URL}/task-list/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTaskList),
  });
  const data = await response.json();

  return data;
});

export const deleteTaskList = createAsyncThunk<number, number>(
  "taskLists/deleteTaskList",
  async (id) => {
    await fetch(`${BASE_URL}/task-list/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);
