import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Nothing to see here", 
  description = "Get started by adding your first item",
  actionLabel = "Get Started",
  onAction,
  icon = "Plus"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
      >
        <ApperIcon name={icon} size={32} className="text-primary" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-display font-semibold text-2xl text-gray-900">
          {title}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <Button 
              onClick={onAction}
              className="inline-flex items-center gap-2"
            >
              <ApperIcon name={icon} size={16} />
              {actionLabel}
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary/20 rounded-full"
      />
    </motion.div>
  );
};

export default Empty;