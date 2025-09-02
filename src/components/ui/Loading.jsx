import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";

const Loading = () => {
  const shimmer = {
    hidden: { opacity: 0.3 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-3">
          <motion.div 
            variants={shimmer}
            initial="hidden"
            animate="visible"
            className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
          />
          <motion.div 
            variants={shimmer}
            initial="hidden"
            animate="visible"
            className="h-4 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          />
        </div>
        
        <div className="lg:w-80">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <motion.div 
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl"
              />
              <div className="space-y-2">
                <motion.div 
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                />
                <motion.div 
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  className="h-3 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="text-center space-y-3">
                  <motion.div 
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="w-12 h-12 mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl"
                  />
                  <motion.div 
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="h-6 w-12 mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                  />
                  <motion.div 
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="h-3 w-16 mx-auto bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                  />
                  <motion.div 
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="h-2 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Add Skeleton */}
      <Card className="p-4">
        <div className="flex gap-3 items-center">
          <motion.div 
            variants={shimmer}
            initial="hidden"
            animate="visible"
            className="flex-1 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl"
          />
          <motion.div 
            variants={shimmer}
            initial="hidden"
            animate="visible"
            className="w-20 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl"
          />
        </div>
      </Card>

      {/* Filter Bar Skeleton */}
      <Card className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i}
              variants={shimmer}
              initial="hidden"
              animate="visible"
              className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg"
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <motion.div 
            variants={shimmer}
            initial="hidden"
            animate="visible"
            className="h-4 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          />
          <motion.div 
            variants={shimmer}
            initial="hidden"
            animate="visible"
            className="h-4 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          />
        </div>
      </Card>

      {/* Task Cards Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-3">
              <motion.div 
                variants={shimmer}
                initial="hidden"
                animate="visible"
                className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md mt-0.5"
              />
              
              <div className="flex-1 space-y-2">
                <motion.div 
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                />
                <motion.div 
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  className="h-4 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                />
                
                <div className="flex items-center gap-2 mt-2">
                  <motion.div 
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
                  />
                  <motion.div 
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="h-6 w-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"
                  />
                  <motion.div 
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Loading;