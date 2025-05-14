import React from 'react';

function Navbar({ activeTab, setActiveTab, cartItemCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Farm-to-Table Market</h1>
      </div>
      
      <div className="navbar-menu">
        <button 
          className={`menu-button ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={`menu-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
      </div>
      
      <div className="navbar-user">
        <div className="cart-icon">
          <span className="material-icons">shopping_cart</span>
          <span className="cart-badge">{cartItemCount}</span>
        </div>
        <button className="user-button">
          <span className="material-icons">person</span>
          My Account
        </button>
      </div>
    </nav>
  );
}

export default Navbar;