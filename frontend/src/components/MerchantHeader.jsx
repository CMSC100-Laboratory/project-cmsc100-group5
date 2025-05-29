import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from 'react'; // Import useContext
import AuthContext from "../context/AuthContext";

const MerchantHeader = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AuthContext); // Get logoutUser from AuthContext

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logout function from AuthContext
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed in MerchantHeader:", error);
      // Optionally, show an error message to the user
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <nav className="bg-[#14422C] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">

          {/* Left Section: Farm-To-Table Title */}
          <div className="text-xl font-semibold">
            Sarii Admin Dashboard
          </div>

          {/* Center Section: Navigation Links (flex-grow and justify-center to center them) */}
          <div className="hidden md:flex flex-grow justify-center space-x-4">
            <NavLink to="orders" className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }>Order</NavLink>
            <NavLink to="sales" className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }>Sales</NavLink>
            <NavLink to="users" className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }>Users</NavLink>
            <NavLink to="products" className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }>Products</NavLink>
          </div>

          {/* Right Section: Logout Button */}
          {/* ml-auto pushes this div to the far right when using flex on the parent */}
          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="bg-complement hover:bg-secondary text-primary hover:text-complement py-1.5 px-5 rounded-full transition"
            >
              Logout
            </button>
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
