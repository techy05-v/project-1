// src/components/categories/AddCategory.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryService from '../../api/categoryServices/categoryService';

function AddCategory() {
  const [category, setCategory] = useState({
    CategoryName: '',
    description: '',
    isactive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevCategory => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate inputs
      if (!category.CategoryName.trim()) {
        toast.error("Category Name is required");
        setLoading(false);
        return;
      }

      const response = await CategoryService.addCategory(category);
      toast.success("Category added successfully!");
      
      // Reset form
      setCategory({ 
        CategoryName: '', 
        description: '', 
        isactive: true 
      });
    } catch (err) {
      const errorMessage = err.message || "Failed to add category";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" 
              htmlFor="CategoryName"
            >
              Category Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="CategoryName"
              type="text"
              placeholder="Enter category name"
              name="CategoryName"
              value={category.CategoryName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" 
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter category description"
              name="description"
              value={category.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isactive"
                checked={category.isactive}
                onChange={(e) => setCategory(prev => ({
                  ...prev, 
                  isactive: e.target.checked
                }))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <button
              className={`
                ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} 
                text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline
              `}
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddCategory;