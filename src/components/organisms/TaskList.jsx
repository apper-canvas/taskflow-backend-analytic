import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/molecules/TaskCard";
import TaskForm from "@/components/molecules/TaskForm";
import FilterBar from "@/components/molecules/FilterBar";
import { taskService } from "@/services/api/taskService";
import { isOverdue, isDueToday } from "@/utils/dateUtils";

const TaskList = ({ 
  tasks, 
  categories, 
  onTasksUpdate, 
  currentCategoryId = null 
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");
  const [selectedCategory, setSelectedCategory] = useState(currentCategoryId || "");
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === parseInt(categoryId));
  };

  const filteredTasks = tasks.filter(task => {
    // Category filter
    if (selectedCategory && task.categoryId !== parseInt(selectedCategory)) {
      return false;
    }
    
    if (currentCategoryId && task.categoryId !== parseInt(currentCategoryId)) {
      return false;
    }

    // Status filter
    switch (activeFilter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      case "overdue":
        return !task.completed && task.dueDate && isOverdue(task.dueDate);
      case "today":
        return task.dueDate && isDueToday(task.dueDate);
      default:
        return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "dueDate":
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case "priority":
        const priorityOrder = { "high": 3, "medium": 2, "low": 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "title":
        return a.title.localeCompare(b.title);
      default: // created
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date().toISOString() : null
      };

      await taskService.update(taskId, updatedTask);
      
      const updatedTasks = await taskService.getAll();
      onTasksUpdate(updatedTasks);
      
      toast.success(
        !task.completed ? "Task completed! 🎉" : "Task reopened",
        { autoClose: 2000 }
      );
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await taskService.delete(taskId);
      const updatedTasks = await taskService.getAll();
      onTasksUpdate(updatedTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleUpdateTask = async (formData) => {
    try {
      await taskService.update(editingTask.Id, formData);
      const updatedTasks = await taskService.getAll();
      onTasksUpdate(updatedTasks);
      
      setEditingTask(null);
      setShowTaskForm(false);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  return (
    <div className="space-y-6">
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        tasksCount={sortedTasks.length}
      />

      <AnimatePresence>
        {showTaskForm && (
          <TaskForm
            onSubmit={handleUpdateTask}
            categories={categories}
            initialData={editingTask}
            onCancel={handleCancelEdit}
          />
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <AnimatePresence>
          {sortedTasks.map(task => (
            <TaskCard
              key={task.Id}
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))}
        </AnimatePresence>

        {sortedTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              {activeFilter === "completed" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-success"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-primary"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </motion.div>
              )}
            </div>
            
            <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
              {getEmptyStateTitle(activeFilter)}
            </h3>
            <p className="text-gray-600 mb-6">
              {getEmptyStateMessage(activeFilter)}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const getEmptyStateTitle = (filter) => {
  switch (filter) {
    case "active":
      return "All caught up!";
    case "completed":
      return "No completed tasks yet";
    case "overdue":
      return "No overdue tasks";
    case "today":
      return "Nothing due today";
    default:
      return "No tasks yet";
  }
};

const getEmptyStateMessage = (filter) => {
  switch (filter) {
    case "active":
      return "Great job! You have no active tasks right now.";
    case "completed":
      return "Complete some tasks to see them here.";
    case "overdue":
      return "Excellent! You're staying on top of your deadlines.";
    case "today":
      return "No tasks are due today. Enjoy your day!";
    default:
      return "Start by adding your first task to get organized.";
  }
};

export default TaskList;