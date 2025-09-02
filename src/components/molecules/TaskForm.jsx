import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { parseDateInput } from "@/utils/dateUtils";

const TaskForm = ({ onSubmit, categories, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    priority: "medium",
    dueDate: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        categoryId: initialData.categoryId || "",
        priority: initialData.priority || "medium",
        dueDate: initialData.dueDate || ""
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // Parse natural language date inputs
    const parsedDate = parseDateInput(formData.title);
    const finalData = {
      ...formData,
      dueDate: parsedDate || formData.dueDate || null
    };

    onSubmit(finalData);
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        title: "",
        description: "",
        categoryId: "",
        priority: "medium",
        dueDate: ""
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-soft border border-gray-200 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <Input
            placeholder="Enter task title (try 'Call client tomorrow' or 'Meeting friday')"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <Input
            placeholder="Add task description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Select
              value={formData.categoryId}
              onChange={(e) => handleInputChange("categoryId", e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category.Id} value={category.Id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <Select
              value={formData.priority}
              onChange={(e) => handleInputChange("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" className="flex items-center gap-2">
            <ApperIcon name={initialData ? "Save" : "Plus"} size={16} />
            {initialData ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;