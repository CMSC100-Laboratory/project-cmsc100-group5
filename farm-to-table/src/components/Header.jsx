function Header() {
    return (
      <nav className="bg-[#14422C] text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">

          <div className="text-xl font-semibold">
            Farm-To-Table
          </div>
  

          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:underline">User</a>
            <a href="#" className="hover:underline">Products</a>
            <a href="#" className="hover:underline">Order</a>
            <a href="#" className="hover:underline">Sales</a>
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
  