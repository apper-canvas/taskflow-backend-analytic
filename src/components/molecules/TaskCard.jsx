import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/atoms/Card";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { formatTaskDate, isOverdue, isDueToday } from "@/utils/dateUtils";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, category, onToggleComplete, onDelete, onEdit }) => {
  const [showActions, setShowActions] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleToggleComplete = async () => {
    if (!task.completed) {
      setIsCompleting(true);
      setTimeout(() => {
        onToggleComplete(task.Id);
        setIsCompleting(false);
      }, 300);
    } else {
      onToggleComplete(task.Id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "accent";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const getDateStatus = () => {
    if (!task.dueDate) return null;
    
    if (isOverdue(task.dueDate)) {
      return { color: "text-red-500", icon: "AlertCircle", label: "Overdue" };
    }
    if (isDueToday(task.dueDate)) {
      return { color: "text-warning", icon: "Clock", label: "Due today" };
    }
    return { color: "text-gray-500", icon: "Calendar", label: formatTaskDate(task.dueDate) };
  };

  const dateStatus = getDateStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      layout
      className={cn(
        "group relative",
        isCompleting && "confetti-burst"
      )}
    >
      <Card
        className={cn(
          "p-4 cursor-pointer transition-all duration-200 group-hover:shadow-elevated",
          task.completed && "opacity-60",
          isCompleting && "animate-scale-pop",
          task.priority === "high" && "priority-high",
          task.priority === "medium" && "priority-medium", 
          task.priority === "low" && "priority-low"
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            className="mt-0.5 shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className={cn(
                  "font-medium text-gray-900 line-clamp-2",
                  task.completed && "line-through text-gray-500"
                )}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mt-2">
                  {category && (
                    <Badge 
                      variant="primary"
                      className="text-xs"
                      style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                      <ApperIcon name={category.icon} size={12} className="mr-1" />
                      {category.name}
                    </Badge>
                  )}
                  
                  <Badge variant={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  
                  {dateStatus && (
                    <div className={cn("flex items-center gap-1 text-xs", dateStatus.color)}>
                      <ApperIcon name={dateStatus.icon} size={12} />
                      <span>{dateStatus.label}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex gap-1 shrink-0"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task);
                      }}
                      className="p-1.5"
                    >
                      <ApperIcon name="Edit2" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.Id);
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;