import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { parseDateInput } from "@/utils/dateUtils";

const QuickAddBar = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Parse natural language date inputs
    const parsedDate = parseDateInput(title);
    
    const taskData = {
      title: title.trim(),
      description: "",
      categoryId: categories.length > 0 ? categories[0].Id : "",
      priority: "medium",
      dueDate: parsedDate
    };

    onAddTask(taskData);
    setTitle("");
    setIsExpanded(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl shadow-soft p-4 mb-6"
    >
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">
        <div className="flex-1">
          <Input
            placeholder="Quick add task... (try 'Call client tomorrow' or 'Meeting friday')"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !title && setIsExpanded(false)}
            onKeyPress={handleKeyPress}
            className="bg-white/80"
          />
        </div>
        
        <Button 
          type="submit" 
          size="md"
          className="shrink-0"
          disabled={!title.trim()}
        >
          <ApperIcon name="Plus" size={16} className="mr-1" />
          Add
        </Button>
      </form>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-gray-500 mt-2 px-1"
        >
          💡 Try natural language: "Call client tomorrow", "Meeting friday", or "Review today"
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuickAddBar;