import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatsWidget = ({ dailyStats, weeklyStats, totalTasks, completedTasks }) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const StatCard = ({ title, value, max, percentage, icon, color = "primary" }) => (
    <div className="text-center">
      <div className={`w-12 h-12 mx-auto rounded-xl bg-${color}/10 flex items-center justify-center mb-3`}>
        <ApperIcon name={icon} size={20} className={`text-${color}`} />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg text-gradient">{value}/{max}</h3>
        <p className="text-xs text-gray-600">{title}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-2 rounded-full bg-${color} gradient-${color}`}
          />
        </div>
        <span className="text-xs font-medium text-gray-700">{percentage}%</span>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6 glass-effect">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <ApperIcon name="TrendingUp" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg">Progress Today</h2>
            <p className="text-sm text-gray-600">Keep up the great work!</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <StatCard
            title="Today"
            value={dailyStats.completed}
            max={dailyStats.total}
            percentage={dailyStats.percentage}
            icon="Calendar"
            color="primary"
          />
          
          <StatCard
            title="This Week"
            value={weeklyStats.completed}
            max={weeklyStats.total}
            percentage={weeklyStats.percentage}
            icon="BarChart3"
            color="success"
          />
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="font-semibold text-primary">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-3 rounded-full gradient-primary"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsWidget;