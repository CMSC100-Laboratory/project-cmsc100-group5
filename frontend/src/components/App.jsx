import { useState } from 'react';
import Tabs from './Tabs';
import ProductList from './Products';

function App() {
  const tabs = [
    { name: "Users", url: "#users", id: 1 },
    { name: "Products", url: "#products", id: 2 },
    { name: "Orders", url: "#orders", id: 3 },
    { name: "Sales Report", url: "#salesreport", id: 4 },
  ];

  return (
    <>
      <div className='headers'>
        <h2 className='title'> Sarii </h2>
        <nav className='nav_bar'>
          <Tabs data={tabs}/>
        </nav>
      </div>
      <div className='products'>
        <ProductList/>
      </div>
    </>
  )
}

export default App
