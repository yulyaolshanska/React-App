import React, { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddTaskForm.module.scss";

interface FormData {
  name: string;
  description: string;
  dueDate: Date;
  priority: "LOW" | "HIGH" | "MEDIUM";
}

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const AddTaskForm: FC<AddTaskFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    mode: "onChange",
    shouldUnregister: true,
  });

  const handleFormSubmit = (data: FormData) => {
    // Handle form submission
    console.log(data);
    onSubmit();
  };

  return (
    <div className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modal}>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              aria-invalid={errors.name ? "true" : "false"}
              required
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "Name should be at least 2 characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Name should not exceed 30 characters",
                },
              })}
              name="name"
            />
            {errors?.name && touchedFields.name && (
              <p className={styles.errorMessage}>{errors?.name?.message}</p>
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
            <label htmlFor="dueDate" className={styles.label}>
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              aria-invalid={errors.dueDate ? "true" : "false"}
              required
              className={`${styles.input} ${
                errors.dueDate ? styles.error : ""
              }`}
              {...register("dueDate", {
                required: "This field is required",
                validate: {
                  futureDate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    return (
                      selectedDate >= today || "Due Date must be a future date"
                    );
                  },
                },
              })}
              name="dueDate"
            />
            {errors.dueDate && touchedFields.dueDate && (
              <p className={styles.errorMessage}>{errors.dueDate?.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="priority" className={styles.label}>
              Priority:
            </label>
            <select
              id="priority"
              className={styles.select}
              {...register("priority")}
              name="priority"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
