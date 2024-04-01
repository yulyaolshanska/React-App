import React, { useEffect, useRef, useState } from "react";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { AddTaskFormData } from "../../interfaces/AddTaskFormData.interface";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../redux/store";
import {
  deleteTaskList,
  updateTaskList,
} from "../../redux/taskList/ taskListAsyncThunk";
import { addTask, deleteTask } from "../../redux/tasks/taskAsyncThunk";
import AddTaskForm from "../addTaskForm/AddTaskForm";
import DropDown from "../dropDown/DropDown";
import TaskCard from "../taskCard/TaskCard";
import TaskModal from "../taskModal/TaskModal";
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
  const addModalRef = useRef<HTMLDivElement>(null);
  const editModalRef = useRef<HTMLDivElement>(null);
  const [activeTitleInput, setActiveTitleInput] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [activeListId, setActiveListId] = useState<number | undefined>(
    taskLists.length > 0 ? taskLists[0].id : undefined
  );
  const [taskForEdit, setTaskForEdit] = useState<Task | undefined>(undefined);

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

  const handleAddTask = (newTask: AddTaskFormData) => {
    dispatch(addTask(newTask));
  };

  const handleCloseModal = () => {
    setIsOpenAddModal(false);
    setIsOpenEditModal(false);
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

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      addModalRef.current &&
      !addModalRef.current.contains(e.target as Node)
    ) {
      setIsOpenAddModal(false);
    }
    if (
      editModalRef.current &&
      !editModalRef.current.contains(e.target as Node)
    ) {
      setIsOpenEditModal(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpenAddModal(false);
      setIsOpenEditModal(false);
    }
  };

  useEffect(() => {
    if (isOpenAddModal || isOpenEditModal) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpenAddModal, isOpenEditModal]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className={styles.taskLists}>
        {taskLists.length > 0 &&
          taskLists.map((taskList) => (
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
                  onAddClick={() => setIsOpenAddModal(true)}
                  onEditClick={() => focusInput(taskList.id)}
                  onDeleteClick={() => handleDeleteTaskList(taskList.id)}
                  mode="list"
                />
              </div>
              <button
                className={styles.addTaskBtn}
                onClick={() => {
                  setIsOpenAddModal(true);
                  setActiveListId(taskList.id);
                }}
              >
                + Add new task
              </button>
              {activeListId && (
                <AddTaskForm
                  ref={addModalRef}
                  listId={activeListId}
                  onClose={handleCloseModal}
                  onSubmit={handleAddTask}
                  isOpen={isOpenAddModal}
                />
              )}

              {tasks &&
                tasks
                  .filter((t: Task) => t.column.id === taskList.id)
                  .sort(
                    (first: Task, second: Task) =>
                      first.position - second.position
                  )
                  .map((task) => (
                    <TaskCard task={task} key={task.id}>
                      <DropDown
                        onEditClick={() => {
                          setIsOpenEditModal(true);
                          setTaskForEdit(task);
                        }}
                        onDeleteClick={() => handleDeleteTask(task.id)}
                        mode="task"
                      />
                    </TaskCard>
                  ))}
              {activeListId && taskForEdit && (
                <TaskModal
                  task={taskForEdit}
                  ref={editModalRef}
                  listId={activeListId}
                  onClose={handleCloseModal}
                  onSubmit={handleAddTask}
                  isOpen={isOpenEditModal}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskLists;
