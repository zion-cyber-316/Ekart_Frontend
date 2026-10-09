


import { LayoutDashboard, PackagePlus, PackageSearch, User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";


const Sidebar = () => {
  return (
//     <div className="hidden fixed md:block border-r bg-pink-50 border-pink-200 w-10 w-[300px] p-10 space-y-2 h-screen">
//       <div className="text-center pt-10 px-3 space-y-1">
//         <NavLink
//           to="/dashboard/sales"
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-pink-600" : "text-white-200"} flex items-center gap-1 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <LayoutDashboard />
//           <span>Dashboard</span>
//         </NavLink>
//       </div>

//        <div className="text-center pt-10 px-3 space-y-2">
//         <NavLink
//           to="/dashboard/add-product"
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-pink-600" : "text-white-200"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <PackagePlus />
//           <span>Add Product</span>
//         </NavLink>
//       </div>

//        <div className="text-center pt-10 px-3 space-y-2">
//         <NavLink
//           to="/dashboard/products"
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-pink-600" : "text-white-200"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <PackageSearch />
//           <span>Products</span>
//         </NavLink>
//       </div>

//        <div className="text-center pt-10 px-3 space-y-2">
//         <NavLink
//           to="/dashboard/users"
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-pink-600" : "text-white-200"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <User/>
//           <span>Users</span>
//         </NavLink>
//       </div>

//  <div className="text-center pt-10 px-3 space-y-2">
//         <NavLink
//           to="/dashboard/orders"
//           className={({ isActive }) =>
//             `text-xl ${isActive ? "bg-pink-600" : "text-white-200"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
//           }
//         >
//           <FaRegEdit/>
//           <span>Orders</span>
//         </NavLink>
//       </div>
   
//     </div>
<div
  className="
    fixed
    left-0
    top-0
    z-40
    h-screen
    w-[220px]
    sm:w-[250px]
    md:w-[280px]
    lg:w-[300px]
    p-4
    sm:p-6
    md:p-8
    lg:p-10
    space-y-2
    border-r
    bg-pink-50
    border-pink-200
    overflow-y-auto
  "
>

  {/* Dashboard */}
  <div className="text-center pt-10 px-2 space-y-1">

    <NavLink
      to="/dashboard/sales"
      className={({ isActive }) =>
        `text-base sm:text-lg md:text-xl ${
          isActive
            ? "bg-pink-600 text-black"
            : "text-black"
        } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
      }
    >
      <LayoutDashboard />
      <span>Dashboard</span>
    </NavLink>

  </div>


  {/* Add Product */}
  <div className="text-center pt-6 sm:pt-8 md:pt-10 px-2 space-y-2">

    <NavLink
      to="/dashboard/add-product"
      className={({ isActive }) =>
        `text-base sm:text-lg md:text-xl ${
          isActive
            ? "bg-pink-600 text-black"
            : "text-black"
        } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
      }
    >
      <PackagePlus />
      <span>Add Product</span>
    </NavLink>

  </div>


  {/* Products */}
  <div className="text-center pt-6 sm:pt-8 md:pt-10 px-2 space-y-2">

    <NavLink
      to="/dashboard/products"
      className={({ isActive }) =>
        `text-base sm:text-lg md:text-xl ${
          isActive
            ? "bg-pink-600 text-black"
            : "text-black"
        } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
      }
    >
      <PackageSearch />
      <span>Products</span>
    </NavLink>

  </div>


  {/* Users */}
  <div className="text-center pt-6 sm:pt-8 md:pt-10 px-2 space-y-2">

    <NavLink
      to="/dashboard/users"
      className={({ isActive }) =>
        `text-base sm:text-lg md:text-xl ${
          isActive
            ? "bg-pink-600 text-black"
            : "text-black"
        } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
      }
    >
      <User />
      <span>Users</span>
    </NavLink>

  </div>


  {/* Orders */}
  <div className="text-center pt-6 sm:pt-8 md:pt-10 px-2 space-y-2">

    <NavLink
      to="/dashboard/orders"
      className={({ isActive }) =>
        `text-base sm:text-lg md:text-xl ${
          isActive
            ? "bg-pink-600 text-black"
            : "text-black"
        } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`
      }
    >
      <FaRegEdit />
      <span>Orders</span>
    </NavLink>

  </div>

</div>
  )
}

export default Sidebar