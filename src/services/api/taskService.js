import tasksData from "@/services/mockData/tasks.json";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  },

  async create(taskData) {
    await delay(250);
    const newId = Math.max(...tasks.map(t => t.Id), 0) + 1;
    const newTask = {
      Id: newId,
      title: taskData.title,
      description: taskData.description || "",
      categoryId: taskData.categoryId ? parseInt(taskData.categoryId) : null,
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      order: tasks.length
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, taskData) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = {
      ...tasks[index],
      ...taskData,
      Id: parseInt(id),
      categoryId: taskData.categoryId ? parseInt(taskData.categoryId) : null
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
    return true;
  }
};