import React from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from '../api';
import AuthContext from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';

const ConsumerHeader = () => {

  const { auth , logoutUser} = useContext(AuthContext);
  const userEmail = auth.email;
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate for logout

  const handleLogout = async () => { // Make handleLogout async
    console.log("Logging out...");
    try {
        await logoutUser(); // Call the logoutUser function from AuthContext
        navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
        console.error("Logout failed in ConsumerHeader:", error);
        // Optionally, show an error message to the user
        alert("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch cart count on initial load
    const fetchCartCount = async () => {
      try {
        const response = await api.post('/cart/get', {
          email: userEmail
        });


        if (response.data.success) {
          setCartCount(response.data.totalItems || 0);
        }
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    if (userEmail) { // Only fetch if userEmail is available
      fetchCartCount();
    }
  }, [userEmail]);

  return (
    <> {/* Use a Fragment to wrap the header and the main content */}
      <header className="bg-lime-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/images/logo.png" // Ensure this path is correct relative to your public folder
                alt="Farm to Table Logo"
                className="h-16 w-16 mr-4" // Adjusted h-25 w-25 to something more standard like h-16 w-16 or h-20 w-20 as 25 might be very large. If h-25 w-25 works for your Tailwind setup, keep it.
              />
              <h1 className="text-xl font-bold text-white">Your online fresh market</h1>
            </div>

            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4 mr-6">
                <Link
                  to="shop"
                  className="text-white hover:text-lime-300 font-medium transition-colors"
                >
                  Shop
                </Link>
                <Link
                  to="cart"
                  className="text-white hover:text-lime-300 font-medium transition-colors flex items-center"
                >
                  Cart
                  <span className="ml-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full" id="cart-count">
                    {cartCount}
                  </span>
                </Link>
                <Link
                  to="orders"
                  className="text-white hover:text-lime-300 font-medium transition-colors"
                >
                  Orders
                </Link>
              </nav>

              <div className="text-white">
                <span className="font-medium">Hello, {auth.firstName}!</span>
              </div>

              <button
                onClick={handleLogout} // Add onClick handler for logout
                className="bg-lime-700 hover:bg-lime-600 text-white py-2 px-4 rounded transition ml-10"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ConsumerHeader;
