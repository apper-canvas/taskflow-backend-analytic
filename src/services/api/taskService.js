import { toast } from "react-toastify";

export const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}}, 
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('task_c', params);

      if (!response?.data?.length) {
        return [];
      }

      // Transform database fields to UI format
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title_c || '',
        description: task.description_c || '',
        categoryId: task.category_id_c?.Id || null,
        priority: task.priority_c || 'medium',
        dueDate: task.due_date_c || null,
        completed: task.completed_c || false,
        createdAt: task.CreatedOn || new Date().toISOString(),
        completedAt: task.completed_at_c || null,
        order: task.order_c || 0
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}}, 
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "order_c"}},
          {"field": {"Name": "category_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('task_c', parseInt(id), params);

      if (!response?.data) {
        return null;
      }

      const task = response.data;
      return {
        Id: task.Id,
        title: task.title_c || '',
        description: task.description_c || '',
        categoryId: task.category_id_c?.Id || null,
        priority: task.priority_c || 'medium',
        dueDate: task.due_date_c || null,
        completed: task.completed_c || false,
        createdAt: task.CreatedOn || new Date().toISOString(),
        completedAt: task.completed_at_c || null,
        order: task.order_c || 0
      };
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: taskData.title,
          title_c: taskData.title,
          description_c: taskData.description || "",
          priority_c: taskData.priority || "medium",
          due_date_c: taskData.dueDate || null,
          completed_c: false,
          completed_at_c: null,
          order_c: 0,
          category_id_c: taskData.categoryId ? parseInt(taskData.categoryId) : null
        }]
      };

      const response = await apperClient.createRecord('task_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create task:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const created = successful[0].data;
          return {
            Id: created.Id,
            title: created.title_c,
            description: created.description_c || '',
            categoryId: created.category_id_c?.Id || null,
            priority: created.priority_c,
            dueDate: created.due_date_c,
            completed: created.completed_c,
            createdAt: created.CreatedOn,
            completedAt: created.completed_at_c,
            order: created.order_c
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error);
      return null;
    }
  },

  async update(id, taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateRecord = {
        Id: parseInt(id)
      };

      // Only include provided fields
      if (taskData.title !== undefined) {
        updateRecord.Name = taskData.title;
        updateRecord.title_c = taskData.title;
      }
      if (taskData.description !== undefined) {
        updateRecord.description_c = taskData.description;
      }
      if (taskData.priority !== undefined) {
        updateRecord.priority_c = taskData.priority;
      }
      if (taskData.dueDate !== undefined) {
        updateRecord.due_date_c = taskData.dueDate;
      }
      if (taskData.completed !== undefined) {
        updateRecord.completed_c = taskData.completed;
      }
      if (taskData.completedAt !== undefined) {
        updateRecord.completed_at_c = taskData.completedAt;
      }
      if (taskData.categoryId !== undefined) {
        updateRecord.category_id_c = taskData.categoryId ? parseInt(taskData.categoryId) : null;
      }
      if (taskData.order !== undefined) {
        updateRecord.order_c = taskData.order;
      }

      const params = {
        records: [updateRecord]
      };

      const response = await apperClient.updateRecord('task_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update task:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          const updated = successful[0].data;
          return {
            Id: updated.Id,
            title: updated.title_c,
            description: updated.description_c || '',
            categoryId: updated.category_id_c?.Id || null,
            priority: updated.priority_c,
            dueDate: updated.due_date_c,
            completed: updated.completed_c,
            createdAt: updated.CreatedOn,
            completedAt: updated.completed_at_c,
            order: updated.order_c
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error);
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('task_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete task:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      return true;
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error);
      return false;
    }
  }
};