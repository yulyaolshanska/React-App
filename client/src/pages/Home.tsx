import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskLists from "../components/taskList/TaskList";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchTaskLists } from "../redux/taskList/ taskListAsyncThunk";
import {
  selectTaskLists,
  selectTaskListsError,
  selectTaskListsLoading,
} from "../redux/taskList/taskListSelectors";
import { fetchTasks } from "../redux/tasks/taskAsyncThunk";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const taskLists = useSelector(selectTaskLists);
  const isTaskListLoading = useSelector(selectTaskListsLoading);
  const taskListError = useSelector(selectTaskListsError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTaskLists());
        await dispatch(fetchTasks());
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <TaskLists
        taskLists={taskLists}
        tasks={tasks}
        loading={isTaskListLoading}
        error={taskListError}
      />
    </div>
  );
};

export default HomePage;
