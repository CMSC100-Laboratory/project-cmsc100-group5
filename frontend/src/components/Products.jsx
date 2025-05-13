// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios to make API calls

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true);  // State to manage loading status
  const [error, setError] = useState(null);      // State to manage errors

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/sort-products')
      .then((response) => {
        setProducts(response.data); // Store products in state
        setLoading(false);           // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError(`Error: ${err.response ? err.response.data.message : err.message}`);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display loading text while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something goes wrong
  }

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
