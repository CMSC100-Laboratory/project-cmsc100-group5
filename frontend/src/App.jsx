import './styles.css'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Unauthorized from './components/Unauthorized.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Merchant from './pages/Merchant.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Homepage from './pages/Homepage/Homepage.jsx'
import ConsumerHeader from './components/ConsumerHeader.jsx'
import Shop from './pages/Consumer/ConsumerShop.jsx'
import ConsumerOrders from './pages/Consumer/ConsumerOrder.jsx'
import ConsumerCart from './pages/Consumer/ConsumerCart.jsx'


function App() {
  const routes = [
    {
      path: "/",
      element: <Homepage/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/unauthorized",
      element: <Unauthorized/>
    },
        {
      path: "/merchant",
      element: <ProtectedRoute element={<Merchant />} allowedRoles={["Merchant"]} />,
    },
    {
      path: "/consumer",
      element: <ProtectedRoute element={<ConsumerHeader/>} allowedRoles={["Customer"]} />,
      children: [
        {
          path: "shop",
          element: <Shop/>
        },
        {
          path: "orders",
          element: <ConsumerOrders/>
        },
        {
          path: "cart",
          element: <ConsumerCart/>
        },
      ]
    },

  ]

  const router = createBrowserRouter(routes)

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App