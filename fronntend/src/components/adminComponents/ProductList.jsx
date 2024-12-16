
import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductService from '../../api/productService/productService'
import { toast } from 'react-toastify'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    setCurrentPage(page);
    setItemsPerPage(limit);
    fetchProducts(page, limit);
  }, [searchParams])

  const fetchProducts = async (page, limit) => {
    try {
      setIsLoading(true)
      const response = await ProductService.getAllProducts(page, limit)
      setProducts(response.products)
      setTotalPages(response.totalPages)
      setTotalItems(response.total)
      setIsLoading(false)
    } catch (err) {
      console.error('Fetch Products Error:', err)
      setError(err.message || 'Failed to fetch products')
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage.toString(), limit: itemsPerPage.toString() });
    }
  }

  const handleLimitChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setSearchParams({ page: '1', limit: newLimit.toString() });
  }

  const handleSoftDelete = async (productId) => {
    try {
      const updatedProduct = await ProductService.toggleProductStatus(productId)
      setProducts(products.map(product => 
        product._id === productId 
          ? { ...product, isactive: updatedProduct.isactive } 
          : product
      ))
      toast.success(`Product ${updatedProduct.isactive ? 'unblocked' : 'blocked'} successfully`)
    } catch (error) {
      toast.error('Failed to update product status')
      console.error('Failed to toggle product status:', error)
    }
  }

  const Pagination = () => (
    <div className="flex flex-col items-center space-y-4 mt-6">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
      
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded flex items-center ${
            currentPage === 1 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <FaChevronLeft className="mr-1" /> Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          // Show first page, last page, current page, and one page before and after current
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pageNumber}
              </button>
            );
          } else if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return <span key={pageNumber}>...</span>;
          }
          return null;
        })}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded flex items-center ${
            currentPage === totalPages 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Next <FaChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link
          to="/admin/products/add"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Product
        </Link>
      </div>
      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!isLoading && products.length === 0 && <p>No products found.</p>}
      {!isLoading && products.length > 0 && (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className={!product.isactive ? "bg-gray-100" : ""}>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          {product.images && product.images.length > 0 && (
                            <img
                              className="w-full h-full rounded-full"
                              src={product.images[0]}
                              alt={product.productName}
                            />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {product.productName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {product.category?.CategoryName || "N/A"}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        ${product.salePrice}
                        {product.discountPercent > 0 && (
                          <span className="ml-2 text-xs text-green-500">
                            -{product.discountPercent}%
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {product.availableSizes?.length > 0
                          ? product.availableSizes.reduce(
                              (total, size) => total + (size.quantity || 0),
                              0
                            )
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${!product.isactive ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {!product.isactive ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                        disabled={!product.isactive}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleSoftDelete(product._id)}
                        className={`${!product.isactive ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}`}
                      >
                        {!product.isactive ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </>
      )}
    </div>
  )
}