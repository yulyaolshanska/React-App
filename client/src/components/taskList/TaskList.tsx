import React, { useRef, useState } from "react";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../redux/store";
import {
  deleteTaskList,
  updateTaskList,
} from "../../redux/taskList/ taskListAsyncThunk";
import { deleteTask } from "../../redux/tasks/taskAsyncThunk";
import DropDown from "../dropDown/DropDown";
import TaskCard from "./taskCard/TaskCard";
import styles from "./TaskLists.module.scss";

interface TaskListProps {
  taskLists: TaskList[];
  tasks: Task[];
  loading: boolean;
  error?: string | null;
}

const TaskLists: React.FC<TaskListProps> = ({
  taskLists,
  tasks,
  loading,
  error,
}) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeTitleInput, setActiveTitleInput] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const handleListTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEditedTitle(event.target.value);
  };

  const handleListTitleSave = (id: number, newTitle: string): void => {
    if (editedTitle) {
      setActiveTitleInput(id);
      dispatch(updateTaskList({ id, newTitle }));
    }
    setEditedTitle("");
    setActiveTitleInput(null);
  };

  const handleDeleteTaskList = (id: number): void => {
    dispatch(deleteTaskList(id));
  };

  const handleDeleteTask = (id: number): void => {
    dispatch(deleteTask(id));
  };

  const focusInput = (id: number) => {
    setActiveTitleInput(id);
    const input = document.getElementById(
      `input-${id}`
    ) as HTMLInputElement | null;
    if (input) {
      input.focus();
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className={styles.taskLists}>
        {taskLists.map((taskList) => (
          <li key={taskList.id}>
            <div className={styles.listTitleContainer}>
              <input
                id={`input-${taskList.id}`}
                name="title"
                value={
                  activeTitleInput === taskList.id
                    ? editedTitle
                    : taskList.title
                }
                className={`${styles.listTitleInput} ${
                  activeTitleInput === taskList.id ? styles.activeInput : ""
                }`}
                onClick={() => setActiveTitleInput(taskList.id)}
                onBlur={() => handleListTitleSave(taskList.id, editedTitle)}
                onChange={handleListTitleChange}
                ref={inputRef}
              />
              <DropDown
                onEditClick={() => focusInput(taskList.id)}
                onDeleteClick={() => handleDeleteTaskList(taskList.id)}
                type="list"
              />
            </div>
            {tasks
              .filter((t: Task) => t.column.id === taskList.id)
              .sort(
                (first: Task, second: Task) => first.position - second.position
              )
              .map((task) => (
                <TaskCard task={task} key={task.id}>
                  <DropDown
                    onEditClick={() => console.log("Open Edit form")}
                    onDeleteClick={() => handleDeleteTask(task.id)}
                    type="task"
                  />
                </TaskCard>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskLists;
