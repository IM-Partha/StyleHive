import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/Api_Url';

const Products = () => {
  const [sellProducts, setSellProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}api/products/all`)
      .then(response => {
        const allProducts = response.data.products[0].All;

        // Log the full product structure to verify what the response looks like
        console.log('Fetched Products:', allProducts);

        // Manually setting `onSale` to true for testing purposes (remove after confirming)
        const modified = allProducts.map(item => ({
          ...item,
          onSale: item.onSale === true ? true : false,  // Ensure onSale is boolean
        }));

        // Log modified data to verify changes
        console.log('Modified Products:', modified);

        setSellProducts(modified); // Update state
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleImageClick = () => {
    window.location.href = '/allproducts';  
  };

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">🔥 Today Deals</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sellProducts.map(item => (
          <div
            key={item.id}
            className="card bg-white shadow-lg hover:shadow-2xl transition-transform duration-300 rounded-xl relative"
          >
            
            <div className="absolute top-3 left-3 z-10">
              <span className="badge bg-red-500 text-white text-xs px-2 py-1">Sell</span>
            </div>

           
            <figure 
              className="p-4 bg-gray-100 rounded-t-xl cursor-pointer" 
              onClick={() => handleImageClick(item.link)} 
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-48 w-full object-contain transform hover:scale-105 transition duration-300"
              />
            </figure>

            <div className="card-body px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-primary font-medium text-base mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
