import React, { useState, useEffect } from "react";
import { Filter, Loader } from "lucide-react";
import ProductCard from "../../authentication/user/ProductCard";
import { fetchProducts, fetchCategories } from "../../api/product";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        
        console.log('Processed Products Data:', productsData);
        console.log('Processed Categories Data:', categoriesData);
        
        // Ensure we're setting an array
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (err) {
        console.error('Complete Load Error:', err);
        setError(err.message || 'Failed to load data. Please try again later.');
        setProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }
  
    loadData();
  }, []);
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter(
    (product) =>
      selectedCategories.size === 0 || selectedCategories.has(product.category)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Filters</h2>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="mb-3 font-medium">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category._id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedCategories.has(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                      />
                      <span className="ml-2 text-sm">
                        {category.CategoryName}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span className="text-sm font-medium">Sort by:</span>
                <select className="rounded-lg border border-gray-300 py-1 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
              <span className="text-sm text-gray-600">
                Showing {filteredProducts.length} products
              </span>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.productName || "Unnamed Product"}
                  price={product.salePrice || 0}
                  images={product.images || []}
                  discountPercent={product.discountPercent || 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
