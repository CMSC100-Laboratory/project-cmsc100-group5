import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Changed Link to NavLink

const MerchantHeader = () => {
  return (
    <>
      <nav className="bg-[#14422C] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
          <div className="text-xl font-semibold">
            Farm-To-Table
          </div>
          <div className="hidden md:flex space-x-4">
            <NavLink to="orders" className={({ isActive }) =>
              isActive
                ? "text-white" // Active style
                : "text-gray-400 hover:text-white" // Inactive style
            }>Order</NavLink>
            <NavLink to="sales" className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }>Sales</NavLink>
            {/* ... other NavLinks */}
          </div>
        </div>
      </nav>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default MerchantHeader;