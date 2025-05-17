import React from 'react';
import { Link } from 'react-router-dom';

//routes and reusable header 
const Header = ({ cartCount = 0 }) => {
  return (
    <header className="bg-lime-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Farm to Table Logo"
              className="h-25 w-25 mr-10"
            />
            <h1 className="text-xl font-bold text-white">Your online fresh market</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4 mr-6">
              <Link 
                to="/" 
                className="text-white hover:text-lime-500 font-medium transition-colors"
              >
                Shop
              </Link>
              <Link 
                to="/cart" 
                className="text-white hover:text-lime-500 font-medium transition-colors flex items-center"
              >
                Cart
                <span className="ml-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full" id="cart-count">
                  {cartCount}
                </span>
              </Link>
            </nav>
            
            <div className="text-white">
              <span className="font-medium">Ana Garcia</span>
              <span className="text-lime-200 text-sm ml-2">(anagarcia@example.com)</span>
            </div>
            
            <button className="bg-lime-700 hover:bg-lime-600 text-white py-2 px-4 rounded transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;