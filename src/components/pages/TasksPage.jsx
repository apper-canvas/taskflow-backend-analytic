import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import QuickAddBar from "@/components/molecules/QuickAddBar";
import TaskList from "@/components/organisms/TaskList";
import StatsWidget from "@/components/molecules/StatsWidget";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { getWeekStats, getDayStats } from "@/utils/dateUtils";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const TasksPage = () => {
  const { categoryId } = useParams();
  const { 
    tasks, 
    loading: tasksLoading, 
    error: tasksError, 
    updateTasks, 
    addTask, 
    retryFetch: retryTasks 
  } = useTasks();
  const { 
    categories, 
    loading: categoriesLoading, 
    error: categoriesError, 
    retryFetch: retryCategories 
  } = useCategories();

  if (tasksLoading || categoriesLoading) {
    return <Loading />;
  }

  if (tasksError || categoriesError) {
    return (
      <Error 
        message={tasksError || categoriesError}
        onRetry={() => {
          retryTasks();
          retryCategories();
        }}
      />
    );
  }

  // Filter tasks by category if specified
  const filteredTasks = categoryId 
    ? tasks.filter(task => task.categoryId === parseInt(categoryId))
    : tasks;

  // Calculate stats
  const completedTasks = tasks.filter(task => task.completed).length;
  const dailyStats = getDayStats(tasks);
  const weeklyStats = getWeekStats(tasks);

  // Get current category info
  const currentCategory = categoryId 
    ? categories.find(cat => cat.Id === parseInt(categoryId))
    : null;

  const pageTitle = currentCategory 
    ? `${currentCategory.name} Tasks`
    : "All Tasks";

  const pageDescription = currentCategory
    ? `Manage your ${currentCategory.name.toLowerCase()} tasks`
    : "Organize and complete your daily tasks efficiently";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="font-display font-bold text-3xl text-gradient mb-2">
            {pageTitle}
          </h1>
          <p className="text-gray-600">
            {pageDescription}
          </p>
        </div>

        <div className="lg:w-80">
          <StatsWidget
            dailyStats={dailyStats}
            weeklyStats={weeklyStats}
            totalTasks={tasks.length}
            completedTasks={completedTasks}
          />
        </div>
      </div>

      {/* Quick Add */}
      <QuickAddBar 
        onAddTask={addTask}
        categories={categories}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        categories={categories}
        onTasksUpdate={updateTasks}
        currentCategoryId={categoryId}
      />
    </motion.div>
  );
};

export default TasksPage;