import React, { useState } from "react";
import { weekdays } from "../../constants";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../redux/store";
import { updateTask } from "../../redux/tasks/taskAsyncThunk";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
  children: React.ReactElement;
  columns: TaskList[];
}

const TaskCard: React.FC<TaskCardProps> = ({ task, columns, children }) => {
  const dispatch = useAppDispatch();
  const [selectedColumnId, setSelectedColumnId] = useState(task?.column?.id);

  const formatDueDate = (dueDate: Date): string => {
    const date = new Date(dueDate);

    const day = weekdays[date.getDay()];
    const month = date.toLocaleString("en-US", { month: "short" });

    return `${day}, ${date.getDate()} ${month} `;
  };

  const handleMoveTask = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumnId(+e.target.value);
    try {
      await dispatch(
        updateTask({ id: task.id, updatedTask: { columnId: +e.target.value } })
      );
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <div className={styles.taskCard}>
      {children}

      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.dueDate}>Due Date: {formatDueDate(task.due_date)}</p>
      <p className={styles.priority}>Priority: {task.priority}</p>
      <div className={styles.formGroup}>
        <label htmlFor="columnId" className={styles.label}>
          Move to:
        </label>
        <select
          id="columnId"
          onChange={(e) => handleMoveTask(e)}
          className={styles.select}
          name="columnId"
        >
          <option value={task.column.title}></option>
          {columns
            .filter((column) => column.id !== task.column.id)
            .map((column) => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
export default TaskCard;
