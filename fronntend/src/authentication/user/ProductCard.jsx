import React from 'react';
import { Link } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ id, name, price, images, discountPercent }) => {
  // Calculate discounted price if applicable
  const originalPrice = price;
  const discountedPrice = discountPercent 
    ? price * (1 - discountPercent / 100) 
    : price;

  // Use first image or fallback to placeholder
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : "/placeholder.svg?height=300&width=300";

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 max-w-xs w-full">
      <Link to={`/user/product/${id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img
            src={imageUrl}
            alt={name || 'Product'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60"></div>
        </div>
        
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 transition-colors duration-300 group-hover:text-gray-900 font-serif">
            {name || 'Product Name'}
          </h3>
          
          <div className="flex items-center mb-3">
            {discountPercent > 0 ? (
              <>
                <span className="text-lg font-semibold text-red-600 mr-2">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  {discountPercent}% OFF
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-700">
                ₹{price.toFixed(2)}
              </span>
            )}
          </div>
          
          <button className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-black py-2 px-4 text-sm font-semibold text-white shadow-md transition duration-300 hover:from-cyan-600 hover:to-black focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </Link>

      <div className="absolute top-2 right-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 px-3 py-1 text-xs font-bold text-white shadow-md">
        New Arrival
      </div>
    </div>
  );
};

export default ProductCard;