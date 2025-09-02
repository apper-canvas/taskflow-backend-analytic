import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import Sidebar from "@/components/organisms/Sidebar";
import { clearUser } from "@/store/userSlice";

const Layout = () => {
  const { categories, loading: categoriesLoading, error: categoriesError, updateCategories } = useCategories();
  const { tasks, loading: tasksLoading, error: tasksError } = useTasks();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  const handleLogout = async () => {
    try {
      const { ApperUI } = window.ApperSDK;
      await ApperUI.logout();
      dispatch(clearUser());
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
        onLogout={handleLogout}
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