import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  categories,
  selectedCategory,
  onCategoryChange,
  tasksCount
}) => {
  const filters = [
    { key: "all", label: "All Tasks", icon: "List" },
    { key: "active", label: "Active", icon: "Circle" },
    { key: "completed", label: "Completed", icon: "CheckCircle" },
    { key: "overdue", label: "Overdue", icon: "AlertCircle" },
    { key: "today", label: "Due Today", icon: "Clock" }
  ];

  const sortOptions = [
    { value: "created", label: "Date Created" },
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "title", label: "Alphabetical" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "primary" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.key)}
              className={cn(
                "flex items-center gap-1.5 text-sm",
                activeFilter === filter.key && "shadow-soft"
              )}
            >
              <ApperIcon name={filter.icon} size={14} />
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="min-w-[140px]"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.Id} value={category.Id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="min-w-[120px]"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          Showing {tasksCount} tasks
        </span>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <ApperIcon name="Info" size={12} />
          <span>Use Cmd+Enter to quick add tasks</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;