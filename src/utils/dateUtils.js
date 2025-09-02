import { format, isToday, isTomorrow, isThisWeek, parseISO, startOfWeek, endOfWeek, startOfDay, endOfDay, isAfter, isBefore } from "date-fns";

export const formatTaskDate = (dateString) => {
  if (!dateString) return "";
  
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
  
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isThisWeek(date)) return format(date, "EEEE");
  return format(date, "MMM dd");
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
  return isBefore(date, startOfDay(new Date()));
};

export const isDueToday = (dateString) => {
  if (!dateString) return false;
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
  return isToday(date);
};

export const isDueSoon = (dateString) => {
  if (!dateString) return false;
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
  return isThisWeek(date) && !isOverdue(dateString) && !isToday(date);
};

export const parseDateInput = (input) => {
  const lowercased = input.toLowerCase().trim();
  const today = new Date();
  
  if (lowercased.includes("today")) {
    return today.toISOString().split("T")[0];
  }
  
  if (lowercased.includes("tomorrow")) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }
  
  if (lowercased.includes("monday") || lowercased.includes("mon")) {
    return getNextWeekday(1);
  }
  if (lowercased.includes("tuesday") || lowercased.includes("tue")) {
    return getNextWeekday(2);
  }
  if (lowercased.includes("wednesday") || lowercased.includes("wed")) {
    return getNextWeekday(3);
  }
  if (lowercased.includes("thursday") || lowercased.includes("thu")) {
    return getNextWeekday(4);
  }
  if (lowercased.includes("friday") || lowercased.includes("fri")) {
    return getNextWeekday(5);
  }
  
  return null;
};

const getNextWeekday = (targetDay) => {
  const today = new Date();
  const currentDay = today.getDay();
  let daysToAdd = targetDay - currentDay;
  
  if (daysToAdd <= 0) {
    daysToAdd += 7;
  }
  
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysToAdd);
  return nextDate.toISOString().split("T")[0];
};

export const getWeekStats = (tasks) => {
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  
  const weeklyTasks = tasks.filter(task => {
    if (!task.createdAt) return false;
    const taskDate = parseISO(task.createdAt);
    return isAfter(taskDate, weekStart) && isBefore(taskDate, weekEnd);
  });
  
  const weeklyCompleted = weeklyTasks.filter(task => task.completed).length;
  
  return {
    total: weeklyTasks.length,
    completed: weeklyCompleted,
    percentage: weeklyTasks.length > 0 ? Math.round((weeklyCompleted / weeklyTasks.length) * 100) : 0
  };
};

export const getDayStats = (tasks) => {
  const today = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  
  const dailyTasks = tasks.filter(task => {
    if (!task.createdAt) return false;
    const taskDate = parseISO(task.createdAt);
    return isAfter(taskDate, today) && isBefore(taskDate, todayEnd);
  });
  
  const dailyCompleted = dailyTasks.filter(task => task.completed).length;
  
  return {
    total: dailyTasks.length,
    completed: dailyCompleted,
    percentage: dailyTasks.length > 0 ? Math.round((dailyCompleted / dailyTasks.length) * 100) : 0
  };
};