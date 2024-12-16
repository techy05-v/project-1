// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { axiosInstance } from '../../api/axiosConfig';

// export default function ProductPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [showZoom, setShowZoom] = useState(false);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axiosInstance.get(`/user/product/${id}`);
//         setProduct(response.data.data);
//       } catch (err) {
//         console.error('Error fetching product:', err);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) return null;

//   const handleMouseEnter = () => {
//     setShowZoom(true);
//   };

//   const handleMouseLeave = () => {
//     setShowZoom(false);
//   };

//   const handleMouseMove = (e) => {
//     if (imageRef.current) {
//       const { left, top, width, height } = imageRef.current.getBoundingClientRect();
//       const x = ((e.pageX - left) / width) * 100;
//       const y = ((e.pageY - top) / height) * 100;
//       setPosition({ x, y });
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Image Section */}
//         <div>
//           {/* Main Image Display */}
//           <div 
//             className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 border-spacing-y-1 relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             onMouseMove={handleMouseMove}
//             ref={imageRef}
//           >
//             <img
//               src={product.images[selectedImage]}
//               alt={product.productName}
//               className="w-full h-full object-cover"
//             />
//             {showZoom && (
//               <div 
//                 className="absolute inset-0 pointer-events-none"
//                 style={{
//                   backgroundImage: `url(${product.images[selectedImage]})`,
//                   backgroundPosition: `${position.x}% ${position.y}%`,
//                   backgroundSize: '250%',
//                   backgroundRepeat: 'no-repeat'
//                 }}
//               />
//             )}
//           </div>

//           {/* Thumbnail Section */}
//           <div className="grid grid-cols-4 gap-2">
//             {product.images.map((image, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedImage(index)}
//                 className={`border-2 rounded-md overflow-hidden ${
//                   selectedImage === index ? 'border-black' : 'border-gray-200'
//                 }`}
//               >
//                 <img
//                   src={image}
//                   alt={`${product.productName} thumbnail ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className="flex flex-col space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold">{product.productName}</h1>
//             <p className="text-lg text-gray-600">
//               {product.category.CategoryName}
//             </p>
//           </div>
//           <div>
//             <p className="text-xl">
//               MRP: ₹ {product.salePrice}
//               {product.discountPercent > 0 && (
//                 <span className="text-sm text-green-600 ml-2">
//                   ({product.discountPercent}% OFF)
//                 </span>
//               )}
//             </p>
//             <p className="text-sm text-gray-500">incl. of taxes</p>
//             <p className="text-sm text-gray-500">(Also includes all applicable duties)</p>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Description</h2>
//             <p className="text-gray-700">{product.description}</p>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <button className="w-full py-4 border border-black rounded-md hover:bg-gray-50">
//               ADD TO BAG
//             </button>
//             <button className="w-full py-4 bg-black text-white rounded-md hover:bg-gray-900">
//               BUY NOW
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosConfig';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/user/product/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setError('');
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to bag.');
      return;
    }
    // Add to bag logic here
    console.log(`Added ${product.productName} with size ${selectedSize} to bag`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setError('Please select a size before proceeding to buy.');
      return;
    }
    // Buy now logic here
    console.log(`Proceeding to buy ${product.productName} with size ${selectedSize}`);
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.pageX - left) / width) * 100;
      const y = ((e.pageY - top) / height) * 100;
      setPosition({ x, y });
    }
  };

  const isOutOfStock = product.status === 'outOfStock' || product.availableSizes.every(size => size.quantity === 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <div 
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            ref={imageRef}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.productName}
              className="w-full h-full object-cover"
            />
            {showZoom && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url(${product.images[selectedImage]})`,
                  backgroundPosition: `${position.x}% ${position.y}%`,
                  backgroundSize: '250%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-md overflow-hidden ${
                  selectedImage === index ? 'border-black' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.productName}</h1>
            <p className="text-lg text-gray-600">
              {product.category.CategoryName}
            </p>
          </div>
          <div>
            <p className="text-xl">
              MRP: ₹ {product.salePrice}
              {product.discountPercent > 0 && (
                <span className="text-sm text-green-600 ml-2">
                  ({product.discountPercent}% OFF)
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500">incl. of taxes</p>
            <p className="text-sm text-gray-500">(Also includes all applicable duties)</p>
          </div>
          {/* Color */}
          {/* Size Selection */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Select Size</h2>
            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  onClick={() => handleSizeSelect(sizeObj.size)}
                  disabled={sizeObj.quantity === 0}
                  className={`px-4 py-2 border rounded-md relative ${
                    selectedSize === sizeObj.size
                      ? 'border-black bg-black text-white'
                      : sizeObj.quantity === 0
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  <span>{sizeObj.size}</span>
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="mt-2 text-sm text-green-600">
                Selected size: <span className="font-semibold">{selectedSize}</span>
              </p>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* Status */}
          <div>
            <p className={`text-sm font-semibold ${
              product.status === 'active' ? 'text-green-600' : 
              product.status === 'inactive' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              Status: {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </p>
          </div>
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              className={`w-full py-4 border border-black rounded-md ${
                !isOutOfStock
                  ? 'bg-black text-white hover:bg-gray-900'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={isOutOfStock}
              onClick={handleAddToBag}
            >
              {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO BAG'}
            </button>
            <button 
              className={`w-full py-4 bg-black text-white rounded-md ${
                !isOutOfStock
                  ? 'hover:bg-gray-900'
                  : 'bg-gray-200 cursor-not-allowed'
              }`}
              disabled={isOutOfStock}
              onClick={handleBuyNow}
            >
              {isOutOfStock ? 'OUT OF STOCK' : 'BUY NOW'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



