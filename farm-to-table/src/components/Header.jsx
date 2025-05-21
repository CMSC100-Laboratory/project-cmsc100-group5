import { Link } from 'react-router-dom';

function Header() {
    return (
      <nav className="bg-[#14422C] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">

          <div className="text-xl font-semibold">
            Farm-To-Table
          </div>
  

          <div className="hidden md:flex space-x-4">
            <Link to="/orders" className="hover:underline">Order</Link>
            <Link to="/sales" className="hover:underline">Sales</Link>
            <Link to="/users" className="hover:underline">Users</Link>
            <Link to="/products" className="hover:underline">Products</Link>
          </div>

          <div className="mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </nav>
    );
  }

  export default Header
  