import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      await taskService.create(taskData);
      const updatedTasks = await taskService.getAll();
      setTasks(updatedTasks);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
      throw err;
    }
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const retryFetch = () => {
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    updateTasks,
    addTask,
    retryFetch
  };
};