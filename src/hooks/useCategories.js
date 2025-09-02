import { useState, useEffect } from "react";
import { categoryService } from "@/services/api/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  const retryFetch = () => {
    loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    updateCategories,
    retryFetch
  };
};