
import './styles.css'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import Unauthorized from './components/Unauthorized.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Merchant from './pages/Merchant.jsx'
import Consumer from './pages/Consumer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Homepage from './pages/Homepage/Homepage.jsx'


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
      element: <ProtectedRoute element={<Consumer />} allowedRoles={["Customer"]} />,
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
