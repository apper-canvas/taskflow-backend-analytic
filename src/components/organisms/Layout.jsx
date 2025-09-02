import { Outlet } from "react-router-dom";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import Sidebar from "@/components/organisms/Sidebar";

const Layout = () => {
  const { categories, loading: categoriesLoading, error: categoriesError, updateCategories } = useCategories();
  const { tasks, loading: tasksLoading, error: tasksError } = useTasks();
  const { user, logout } = useAuth();
  // Calculate task counts for each category
  const taskCounts = {};
  tasks.forEach(task => {
    if (task.categoryId) {
      taskCounts[task.categoryId] = (taskCounts[task.categoryId] || 0) + 1;
    }
  });

  return (
    <div className="flex h-screen bg-gray-50">
<Sidebar 
        categories={categories}
        onCategoriesUpdate={updateCategories}
        taskCounts={taskCounts}
        user={user}
        onLogout={logout}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;