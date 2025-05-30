import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const productTypes = {
  1: 'Crop',
  2: 'Poultry',
  3: 'Dairy',
  4: 'Meat',
  5: 'Others'
};

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

const ConsumerCart = () => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');
  const {auth, isLoadingAuth} = useContext(AuthContext);
  const userEmail = auth.email;

  useEffect(() => {
      if (!isLoadingAuth && userEmail) {
          fetchCart();
      } else if (!isLoadingAuth && !userEmail) {
          setLoading(false);
          setCart([]);
          setTotalItems(0);
          setTotalPrice(0);
      }
  },[userEmail, isLoadingAuth]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.post('/cart/get', {
        email: userEmail
      });
      
      if (response.data.success) {
        setCart(response.data.cart || []);
        setTotalItems(response.data.totalItems || 0);
        setTotalPrice(response.data.totalPrice || 0);
        
        // Update cart count in the UI
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
          cartCountElement.textContent = response.data.totalItems || 0;
        }
      } else {
        setError('Failed to fetch cart');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };


  //todo - di nauupdate sa database immediately yung update but pag chinecheckoout naman immediately updated yung quantity 
  //dapat pinapasa yung whole data of product
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
  
    try {
      const response = await api.post('cart/update', {
        email: userEmail,
        productId,
        quantity: newQuantity,
      });
  
      if (response.data.success) {

        const updatedCart = cart.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      
        setCart(updatedCart);
      
        const newTotalItems = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
        const newTotalPrice = updatedCart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
        setTotalItems(newTotalItems);
        setTotalPrice(newTotalPrice);
        
      } else {
        console.error('Server reported error:', response.data.message);
        alert(response.data.message || 'Failed to update item');

        fetchCart();
      }
    } catch (err) {
      console.error('Error updating cart:', err);
      alert(`Error: ${err.message}`);

      fetchCart();
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await api.post('/cart/remove', {
        email: userEmail,
        productId
      });
      
      if (response.data.success) {
        fetchCart();
      } else {
        alert(response.data.message || 'Failed to remove item');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const clearUserCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
    try {
      const response = await api.post('/cart/clear', {
        email: userEmail
      });
      
      if (response.data.success) {
        fetchCart();
      } else {
        alert(response.data.message || 'Failed to clear cart');
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const cartCheckOut = async () => {
    if (!window.confirm('Proceed to checkout? This will place your order.')) return;
    
    try {
      setLoading(true);
      const response = await api.post('/orders/create', {
        email: userEmail
      });
      
      if (response.data.success) {
        setOrderPlaced(true);
        setOrderMessage('Your order has been placed successfully!');
        fetchCart(); 
      } else {
        alert(response.data.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-700"></div>
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
      <h2 className="text-2xl font-bold text-lime-700 mb-6">Your Shopping Cart</h2>
      
      {orderPlaced && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
          <span>{orderMessage}</span>
        </div>
      )}
      
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <img 
            src="/images/empty_cart.png" 
            alt="Empty cart" 
            className="mx-auto h-24 w-24 mb-4"
          />
          <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
          <p className="text-gray-500 mt-2">Explore freshness. Add to cart now.</p>
          <Link to="../shop">
          <button className="mt-3 bg-lime-700 hover:bg-lime-950 text-white font-bold py-2 px-6 rounded">
                  Shop now
            </button>
          </Link>

        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map((item) => (
                  <tr key={item.product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img
                                className="h-10 w-10 rounded"
                                src={`/images/${imageMap[item.product.name] || 'placeholder.png'}`}
                                alt={item.product.name}
                            />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-lime-600 text-green-800">
                        {productTypes[item.product.type]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₱{item.product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                          <span className="text-gray-600">-</span>
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                          <span className="text-gray-600">+</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                      ₱{(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <button
                  onClick={clearUserCart}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  Total Items: <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="text-lg font-bold text-green-700">
                  Total: ₱{totalPrice.toFixed(2)}
                </div>
                <button
                  onClick={cartCheckOut}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerCart;