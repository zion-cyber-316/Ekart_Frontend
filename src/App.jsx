
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Navbar from "./components/ui/Navbar"
import Footer from "./components/ui/Footer"
import Product from "./pages/product/Product"
import Cart from "./pages/cart/Cart"
import { ToastContainer } from "react-toastify"
import Dashboard from "./pages/Dashboard/Dashboard"
import AdminSales from "./pages/Admin/AdminSales"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import SingleProduct from "./pages/product/SingleProduct"
import AddProduct from "./pages/Admin/AddProduct"
import AdminProduct from "./pages/Admin/AdminProduct"
import AdminOrders from "./pages/Admin/AdminOrders"
import AdminUsers from "./pages/Admin/AdminUsers"
import UserInfo from "./pages/Admin/UserInfo"
import ShowUserOrders from "./pages/Admin/ShowUserOrders"
import AddressForm from "./pages/AddressForm"
import OrderSuccess from "./pages/OrderSuccess"




const router = createBrowserRouter([
  {path : "/",
    element :<> <Navbar/><Home/><Footer/></>
  },
    {path : "/signup",
    element :<><Signup/></>
  },
    {path : "/login",
    element :<><Login/></>
  },
   {path : "/profile/:id",
    element :<ProtectedRoutes><Navbar/><Profile/></ProtectedRoutes>
  },
    {path : "/products",
    element :<><Navbar/><Product/></>
  },
   {path : "/product/:id",
    element :<><Navbar/><SingleProduct/></>
  },
    {path : "/cart",
    element :<ProtectedRoutes><Navbar/><Cart/></ProtectedRoutes>
  },
      {path : "/address",
    element :<ProtectedRoutes><AddressForm/></ProtectedRoutes>
  },
    {path : "/order-success",
    element :<ProtectedRoutes><OrderSuccess/></ProtectedRoutes>
  },
     {path : "/dashboard",
    element :<ProtectedRoutes adminOnly={true}><Navbar/><Dashboard/></ProtectedRoutes>,
    children :[
         {path : "sales", element :<><AdminSales/></>},
         {path : "add-product", element :<><AddProduct/></>},
         {path : "products", element :<><AdminProduct/></>},
         {path : "orders", element :<><AdminOrders/></>},
         {path : "users", element :<><AdminUsers/></>},
         {path : "users/:id", element :<><UserInfo/></>},
         {path : "users/orders/:userId", element :<><ShowUserOrders/></>},
    ]
  }

])
function App() {


  return (
 <>
 <RouterProvider router={router} />
 <ToastContainer/>

 </>
  )
}

export default App
