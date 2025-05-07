import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Maincontent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const options = {
        method: 'GET',
        url: 'https://walmart-data.p.rapidapi.com/walmart-category.php',
        params: {
          url: 'https://www.walmart.com/browse/cell-phones/phone-cases/1105910_133161_1997952'
        },
        headers: {
          'x-rapidapi-key': 'c4053a867cmshc9a34a9700a8beap1afca9jsn781c75712f72',
          'x-rapidapi-host': 'walmart-data.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data.products)
        setProducts(response.data.products|| []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <div key={index} className="border p-2 rounded shadow">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
          {/* <h2 className="text-sm font-semibold mt-2">{product.title}</h2>
          <p className="text-green-600 font-bold">${product.price}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Maincontent;
