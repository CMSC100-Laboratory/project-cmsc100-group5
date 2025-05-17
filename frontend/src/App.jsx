
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Shop from './components/Shop';
import Cart from './components/Cart';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const userEmail = 'anagarcia@example.com';

  useEffect(() => {
    // Fetch cart count on initial load
    const fetchCartCount = async () => {
      try {
        const response = await axios.post('http://localhost:3000/cart/get', {
          email: userEmail
        });
        
        if (response.data.success) {
          setCartCount(response.data.totalItems || 0);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, [userEmail]);

  return (
    <Router>
      <div className="min-h-screen bg-green-50">
        <Header cartCount={cartCount} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Shop userEmail={userEmail} />} />
            <Route path="/cart" element={<Cart userEmail={userEmail} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;