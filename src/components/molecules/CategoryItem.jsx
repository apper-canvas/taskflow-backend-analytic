import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CategoryItem = ({ category, taskCount, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group"
    >
      <NavLink
        to={`/category/${category.Id}`}
        className={({ isActive }) =>
          cn(
            "flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-gray-50",
            isActive && "bg-primary/5 border-l-4 border-primary"
          )
        }
      >
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: category.color }}
          />
          <ApperIcon 
            name={category.icon} 
            size={16} 
            className="text-gray-600 shrink-0"
          />
          <span className="font-medium text-gray-900 truncate">
            {category.name}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {taskCount}
          </Badge>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onEdit(category);
              }}
              className="p-1"
            >
              <ApperIcon name="Edit2" size={12} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onDelete(category.Id);
              }}
              className="p-1 text-red-500 hover:bg-red-50"
            >
              <ApperIcon name="Trash2" size={12} />
            </Button>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
};

export default CategoryItem;