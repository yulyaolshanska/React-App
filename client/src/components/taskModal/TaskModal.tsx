import React, { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AddTaskFormData } from "../../interfaces/AddTaskFormData.interface";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../redux/store";
import { addTask, updateTask } from "../../redux/tasks/taskAsyncThunk";
import styles from "./TaskModal.module.scss";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTask: AddTaskFormData) => void;
  listId?: number;
  task: Task;
}

const TaskModal: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TaskModalProps
> = ({ task, isOpen, onClose }, ref) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<AddTaskFormData>({
    mode: "onChange",
    shouldUnregister: true,
  });
  const handleFormSubmit = (data: AddTaskFormData) => {
    dispatch(updateTask({ id: task.id, updatedTask: data }));
    reset();
    onClose();
  };

  const handleClose = () => {
    setIsEditMode(false);
    onClose();
  };

  return (
    <div className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}>
      <div ref={ref} className={styles.modal}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}> Task info</h2>
          <button
            className={styles.editTaskBtn}
            onClick={() => setIsEditMode(true)}
          >
            Edit Task
          </button>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={styles.form}
          >
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Name:
              </label>
              <input
                type="text"
                id="title"
                aria-invalid={errors.title ? "true" : "false"}
                required
                className={`${styles.input} ${
                  errors.title ? styles.error : ""
                }`}
                defaultValue={task.title}
                {...register("title", {
                  required: "This field is required",
                  minLength: {
                    value: 2,
                    message: "Title should be at least 2 characters long",
                  },
                  maxLength: {
                    value: 30,
                    message: "Title should not exceed 30 characters",
                  },
                })}
                name="title"
              />
              {errors?.title && touchedFields.title && (
                <p className={styles.errorMessage}>{errors?.title?.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description:
              </label>
              <input
                type="text"
                id="description"
                aria-invalid={errors.description ? "true" : "false"}
                minLength={2}
                maxLength={100}
                required
                className={`${styles.input} ${
                  errors.description ? styles.error : ""
                }`}
                defaultValue={task.description}
                {...register("description", {
                  required: "This field is required",
                  minLength: {
                    value: 2,
                    message: "Description should be at least 2 characters long",
                  },
                  maxLength: {
                    value: 100,
                    message: "Description should not exceed 100 characters",
                  },
                })}
                name="description"
              />
              {errors.description && touchedFields.description && (
                <p className={styles.errorMessage}>
                  {errors.description?.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="due_date" className={styles.label}>
                Due Date:
              </label>
              <input
                type="date"
                id="due_date"
                aria-invalid={errors.due_date ? "true" : "false"}
                required
                className={`${styles.input} ${
                  errors.due_date ? styles.error : ""
                }`}
                // defaultValue={task.due_date}
                {...register("due_date", {
                  required: "This field is required",
                  validate: {
                    futureDate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      return (
                        selectedDate >= today ||
                        "Due Date must be a future date"
                      );
                    },
                  },
                })}
                name="due_date"
              />
              {errors.due_date && touchedFields.due_date && (
                <p className={styles.errorMessage}>
                  {errors.due_date?.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="priority" className={styles.label}>
                Priority:
              </label>
              <select
                id="priority"
                className={styles.select}
                defaultValue={task.priority}
                {...register("priority")}
                name="priority"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            {isEditMode && (
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            )}
            <button onClick={handleClose} className={styles.closeButton}>
              Cancel
            </button>
          </form>
        </div>
        <div className={styles.historyContainer}>
          <h2 className={styles.title}>Task history</h2>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(TaskModal);
