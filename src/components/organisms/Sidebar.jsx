import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import CategoryItem from "@/components/molecules/CategoryItem";
import ApperIcon from "@/components/ApperIcon";
import { categoryService } from "@/services/api/categoryService";

const Sidebar = ({ categories, onCategoriesUpdate, taskCounts }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "#5B4FE9",
    icon: "Folder"
  });

  const categoryIcons = [
    "Folder", "Briefcase", "Home", "Star", "Heart", "Target", 
    "Clock", "Calendar", "Book", "Coffee", "Lightbulb", "Zap"
  ];

  const categoryColors = [
    "#5B4FE9", "#FF6B6B", "#4ECDC4", "#FFE66D", 
    "#95A5A6", "#E74C3C", "#3498DB", "#F39C12"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.Id, formData);
        toast.success("Category updated successfully!");
      } else {
        await categoryService.create(formData);
        toast.success("Category created successfully!");
      }

      const updatedCategories = await categoryService.getAll();
      onCategoriesUpdate(updatedCategories);
      
      setFormData({ name: "", color: "#5B4FE9", icon: "Folder" });
      setShowAddForm(false);
      setEditingCategory(null);
    } catch (error) {
      toast.error("Failed to save category");
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon
    });
    setEditingCategory(category);
    setShowAddForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await categoryService.delete(categoryId);
      toast.success("Category deleted successfully!");
      
      const updatedCategories = await categoryService.getAll();
      onCategoriesUpdate(updatedCategories);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingCategory(null);
    setFormData({ name: "", color: "#5B4FE9", icon: "Folder" });
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-gradient">TaskFlow</h1>
              <p className="text-sm text-gray-600">Organize your day</p>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-2 mb-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                  isActive ? "bg-primary/5 text-primary border-l-4 border-primary" : "text-gray-700"
                }`
              }
            >
              <ApperIcon name="List" size={18} />
              <span className="font-medium">All Tasks</span>
            </NavLink>

            <NavLink
              to="/today"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                  isActive ? "bg-primary/5 text-primary border-l-4 border-primary" : "text-gray-700"
                }`
              }
            >
              <ApperIcon name="Calendar" size={18} />
              <span className="font-medium">Today</span>
            </NavLink>

            <NavLink
              to="/upcoming"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                  isActive ? "bg-primary/5 text-primary border-l-4 border-primary" : "text-gray-700"
                }`
              }
            >
              <ApperIcon name="Clock" size={18} />
              <span className="font-medium">Upcoming</span>
            </NavLink>
          </nav>

          {/* Categories Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-gray-900">Categories</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(true)}
                className="p-1.5"
              >
                <ApperIcon name="Plus" size={16} />
              </Button>
            </div>

            <div className="space-y-1">
              {categories.map(category => (
                <CategoryItem
                  key={category.Id}
                  category={category}
                  taskCount={taskCounts[category.Id] || 0}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {categories.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <ApperIcon name="FolderOpen" size={32} className="mx-auto mb-2" />
                <p className="text-sm">No categories yet</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(true)}
                  className="mt-2"
                >
                  Create your first category
                </Button>
              </div>
            )}
          </div>

          {/* Add/Edit Category Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 pt-4"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name
                    </label>
                    <Input
                      placeholder="Enter category name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <Select
                        value={formData.icon}
                        onChange={(e) => setFormData(prev => ({...prev, icon: e.target.value}))}
                      >
                        {categoryIcons.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {categoryColors.map(color => (
                          <button
                            key={color}
                            type="button"
                            className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => setFormData(prev => ({...prev, color}))}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="flex-1">
                      {editingCategory ? "Update" : "Add"} Category
                    </Button>
                    <Button type="button" variant="secondary" size="sm" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Sidebar - Overlay */}
      <div className="lg:hidden">
        {/* This would be implemented for mobile with transform overlay pattern */}
      </div>
    </>
  );
};

export default Sidebar;