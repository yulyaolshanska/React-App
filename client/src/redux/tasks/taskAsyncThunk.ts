import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { AddTaskFormData } from "../../interfaces/AddTaskFormData.interface";
import { UpdateTaskFormData } from "../../interfaces/UpdateTaskFormData.interface";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  const data = await response.json();

  return data;
});

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id: number) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`);
    const data = await response.json();

    return data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: AddTaskFormData) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();

    return data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({
    id,
    updatedTask,
  }: {
    id: number;
    updatedTask: UpdateTaskFormData;
  }) => {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    return data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number) => {
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);
