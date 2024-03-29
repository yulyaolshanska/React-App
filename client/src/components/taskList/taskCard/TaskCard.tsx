import React from "react";
import { weekdays } from "../../../constants";
import { Task } from "../../../interfaces/Task";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
  children: React.ReactElement;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, children }) => {
  const formatDueDate = (dueDate: Date): string => {
    const date = new Date(dueDate);

    const day = weekdays[date.getDay()];
    const month = date.toLocaleString("en-US", { month: "short" });

    return `${day}, ${date.getDate()} ${month} `;
  };

  return (
    <div className={styles.taskCard}>
      {children}

      <h3 className={styles.title}>{task.title}</h3>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.dueDate}>Due Date: {formatDueDate(task.due_date)}</p>
      <p className={styles.priority}>Priority: {task.priority}</p>
    </div>
  );
};
export default TaskCard;
