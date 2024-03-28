import React from "react";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { Task } from "../../interfaces/Task";

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
  //   const handleAddTaskList = () => {
  //     const newTaskList: TaskList = { title: "New Task List" }; // Replace with your new task list data
  //     dispatch(addTaskList(newTaskList));
  //   };

  //   const handleUpdateTaskList = (id: number, updatedTaskList: TaskList) => {
  //     dispatch(updateTaskList({ id, updatedTaskList }));
  //   };

  //   const handleDeleteTaskList = (id: number) => {
  //     dispatch(deleteTaskList(id));
  //   };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {taskLists.map((taskList) => (
        <li key={taskList.id}>
          <p>Title: {taskList.title}</p>
          {tasks
            .filter((t: Task) => t.column.id === taskList.id)
            .sort(
              (first: Task, second: Task) => first.position - second.position
            )
            .map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
        </li>
      ))}
    </div>
  );
};

export default TaskLists;
