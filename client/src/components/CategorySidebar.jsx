import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/product-category-list',
        params: { country: 'US' },
        headers: {
          'x-rapidapi-key': '94dacf3346msh6201d9388198241p1f5aa0jsn3522851446e0',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        // Assuming categories are in response.data.categories (adjust if structure differs)
    
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-sidebar p-4 bg-gray-100 min-h-screen">
      <h3 className="text-lg font-bold mb-4">Amazon Categories</h3>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index}>  
              {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
