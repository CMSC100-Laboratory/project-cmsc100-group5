import React, { useState, useEffect } from 'react';
import api from '../../api';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const productTypes = {
  0: 'Vegetables',
  1: 'Crop',
  2: 'Poultry',
  3: 'Dairy',
  4: 'Meat',
  5: 'Others'
};

//Image names
const imageMap = {
    'Tilapia (per kg)': 'tilapia.png',
    'Pineapple (per piece)': 'pineapple.png',
    'Milkfish (per kg)': 'milkfish.png',
    'Cabbage (1 head)': 'cabbage.png',
    'White Onions (1kg)': 'white_onion.png',
    'Pumpkin (1kg)': 'pumpkin.png',
    'Red Rice (5kg)': 'red_rice.png',
    'Eggplant (1kg)': 'eggplant.png',
    'Organic Carrots': 'carrots.png',
    'Kangkong (bundle)': 'kangkong.png',
    'Garlic (250g)': 'garlic.png',
    'Brown Eggs (1 Dozen)': 'brown_eggs.png',
    'Sweet Mangoes (1kg)': 'mango.png',
    'Tomato (1kg)': 'tomatoes.png',
    'White eggs (1dozen)': 'white_eggs.png',
    'Cilantro': 'cilantro.png',
    'Coconut': 'coconut.png',
    'Russet Potatoes': 'russet_potatoes.png',
    'Chicken Breast (1kg)': 'chicken_breast.png',
};


const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const {auth} = useContext(AuthContext);
  const userEmail = auth.email;


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/shop/products');
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const filteredProducts = filter === 'all'
    ? products
    : products.filter(product => product.type === parseInt(filter));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price' || sortBy === 'quantity') {
      return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    } else {
      return sortOrder === 'asc'
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    }
  });

    //todo - implement so that the add to cart function will just add to the quantity of the item in the cart
    //create a local instnce of the cart and set a boolean isInCart.
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/add', {
        email: userEmail,
        productId,
        quantity
      });
      
      if (response.data.success) {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement && response.data.totalItems) {
          cartCountElement.textContent = response.data.totalItems;
        }
        alert('Item added to cart successfully!');
      } else {
        alert(response.data.message || 'Failed to add item to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-lime-900 mb-6">Available Products</h2>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Type:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-lime-600 focus:ring-opacity-50"
            >
              <option value="all">All Products</option>
              {Object.entries(productTypes).map(([typeId, typeName]) => (
                <option key={typeId} value={typeId}>{typeName}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring focus:ring-lime-600 focus:ring-opacity-50"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">Order:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-lime-600 focus:ring-opacity-50"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      
      {sortedProducts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products found
        </div>
      ) : (

        //gridbox declaration
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-lime-100 h-40 flex items-center justify-center overflow-hidden">
                <img
                    className="h-full w-auto object-contain"
                    src={`/images/${imageMap[product.name] || 'placeholder.png'}`}
                    alt={product.name}
                />
                </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                  <span className="bg-lime-700 text-lime-50 text-xs px-2 py-1 rounded-full">
                    {productTypes[product.type]}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1 h-12 overflow-hidden">
                  {product.description}
                </p>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-lime-700 font-bold">
                    ₱{product.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Stock: {product.quantity}
                  </div>
                </div>
                
                <button
                  onClick={() => addToCart(product._id)}
                  disabled={product.quantity < 1}
                  className={`w-full mt-3 py-2 px-4 rounded font-medium text-sm ${
                    product.quantity < 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-lime-700 hover:bg-lime-800 text-white'
                  }`}
                >
                  {product.quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;