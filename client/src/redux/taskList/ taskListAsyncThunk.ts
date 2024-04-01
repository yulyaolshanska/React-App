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

export const addTaskList = createAsyncThunk(
  "taskLists/addTaskList",
  async (newTaskList: TaskList) => {
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
  { id: number; newTitle: string }
>("taskLists/updateTaskList", async ({ id, newTitle }) => {
  const response = await fetch(`${BASE_URL}/task-list/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newTitle }),
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
