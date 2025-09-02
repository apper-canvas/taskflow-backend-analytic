import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[400px] flex items-center justify-center p-6"
    >
      <Card className="max-w-md w-full p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center"
        >
          <ApperIcon name="AlertTriangle" size={32} className="text-red-500" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display font-semibold text-xl text-gray-900 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>
          
          {onRetry && (
            <Button 
              onClick={onRetry} 
              className="w-full flex items-center justify-center gap-2"
            >
              <ApperIcon name="RotateCcw" size={16} />
              Try Again
            </Button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500"
        >
          If this problem persists, please refresh the page or check your internet connection.
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default Error;