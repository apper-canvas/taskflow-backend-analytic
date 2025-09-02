import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const categoryService = {
  async getAll() {
    await delay(250);
    return [...categories];
  },

  async getById(id) {
    await delay(200);
    const category = categories.find(c => c.Id === parseInt(id));
    if (!category) {
      throw new Error("Category not found");
    }
    return { ...category };
  },

  async create(categoryData) {
    await delay(300);
    const newId = Math.max(...categories.map(c => c.Id), 0) + 1;
    const newCategory = {
      Id: newId,
      name: categoryData.name,
      color: categoryData.color || "#5B4FE9",
      icon: categoryData.icon || "Folder",
      taskCount: 0,
      order: categories.length
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(250);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    const updatedCategory = {
      ...categories[index],
      ...categoryData,
      Id: parseInt(id)
    };
    
    categories[index] = updatedCategory;
    return { ...updatedCategory };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Category not found");
    }
    categories.splice(index, 1);
    return true;
  }
};