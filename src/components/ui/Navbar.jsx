
import { setUser } from '@/redux/userSlice'
import axios from 'axios'
import { ShoppingCart, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Navbar = () => {

  const user = useSelector((store) => store.user.user)
  const cart = useSelector((store) => store.product.cart)

  const dispatch = useDispatch()
  const admin = user?.role === "admin"

  const accesToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)

  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accesToken}`
          }
        }
      )

      if (res.data.success) {
        localStorage.removeItem("accessToken")
        navigate("/")
        dispatch(setUser(null))
        setMenuOpen(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>

      <div className='max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8'>

        {/* Logo */}
        <div>
          <p className='text-black font-bold text-xl'>
            E-kart
          </p>
        </div>


        {/* ================= DESKTOP NAVBAR ================= */}
        <nav className='hidden lg:flex gap-10 justify-between items-center'>

          <ul className='flex gap-7 items-center text-xl font-semibold'>

            <Link to={"/"}>
              <li>Home</li>
            </Link>

            <Link to={"/products"}>
              <li>Products</li>
            </Link>

            {
              user && (
                <Link to={`/profile/${user._id}`}>
                  <li>Hello, {user?.firstName}</li>
                </Link>
              )
            }

            {
              admin && (
                <Link to={`/dashboard/sales`}>
                  <li>Dashboard</li>
                </Link>
              )
            }

          </ul>


          {/* Cart */}
          <Link to={"/cart"} className='relative'>
            <ShoppingCart />

            <span className='bg-pink-500 text-white text-sm rounded-full absolute -top-3 -right-5 px-2'>
              {cart?.items?.length || 0}
            </span>
          </Link>


          {/* Login / Logout */}
          {
            user ? (
              <Button
                onClick={logout}
                className='bg-pink-600 text-white cursor-pointer'
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className='bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer'
              >
                Login
              </Button>
            )
          }

        </nav>


        {/* ================= MOBILE HAMBURGER ================= */}
        <div className='lg:hidden flex items-center gap-5'>

          {/* Cart */}
          <Link to={"/cart"} className='relative'>
            <ShoppingCart />

            <span className='bg-pink-500 text-white text-xs rounded-full absolute -top-3 -right-4 px-2'>
              {cart?.items?.length || 0}
            </span>
          </Link>


          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-black cursor-pointer'
          >
            {
              menuOpen
                ? <X size={28} />
                : <Menu size={28} />
            }
          </button>

        </div>

      </div>


      {/* ================= MOBILE MENU ================= */}
      {
        menuOpen && (
          <div className='lg:hidden bg-pink-50 border-t border-pink-200 shadow-lg'>

            <ul className='flex flex-col items-center gap-5 py-6 text-lg font-semibold'>

              <Link
                to="/"
                onClick={closeMenu}
              >
                <li>Home</li>
              </Link>


              <Link
                to="/products"
                onClick={closeMenu}
              >
                <li>Products</li>
              </Link>


              {
                user && (
                  <Link
                    to={`/profile/${user._id}`}
                    onClick={closeMenu}
                  >
                    <li>
                      Hello, {user?.firstName}
                    </li>
                  </Link>
                )
              }


              {
                admin && (
                  <Link
                    to="/dashboard/sales"
                    onClick={closeMenu}
                  >
                    <li>Dashboard</li>
                  </Link>
                )
              }


              {/* Login / Logout */}
              {
                user ? (
                  <Button
                    onClick={logout}
                    className='bg-pink-600 text-white cursor-pointer w-[120px]'
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/login")
                      closeMenu()
                    }}
                    className='bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer w-[120px]'
                  >
                    Login
                  </Button>
                )
              }

            </ul>

          </div>
        )
      }

    </header>
  )
}

export default Navbar
























// import { setUser } from '@/redux/userSlice'
// import axios from 'axios'
// import { ShoppingCart } from 'lucide-react'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { Button } from '@/components/ui/button'
// import store from '@/redux/store'

// const Navbar = () => {
//   const user = useSelector((store)=>store.user.user)
//   const cart = useSelector((store)=>store.product.cart)


//   const dispatch = useDispatch()
//   const admin = user?.role === "admin" ? true : false

//   const accesToken = localStorage.getItem('accessToken')
//   const navigate = useNavigate()



//   const logout =async ()=>{
//     try{
//       const res = await axios.post(`http://localhost:5500/api/auth/logout` ,{},{
//         headers :{
//           Authorization :`Bearer ${accesToken}`
//         }
//       })

//       if(res.data.success){
//         console.log(res)
//          localStorage.removeItem("accessToken");
//         navigate("/")
//         dispatch(setUser(null))


//       }
//     }catch(error){
//       console.log(error)
//     }

//   }
//   return (
//     <header className='bg-pink-50 fixed w-full z-20 border-b border-pink-200'>
//       <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>

//         {/* logo section */}
//         <div>
//           <p className='w-[100px] text-black font-bold ml-10'>E-kart</p>
//         </div>

//         {/* nav section */}
//         <nav className='flex gap-10 justify-between items-center mr-10'>
//           <ul className='flex gap-7 items-center text-xl font-semibold'>
//             <Link to={"/"}><li>Home</li></Link>
//             <Link to={"/products"}><li>Products</li></Link>
//             {
//               user && <Link to={`/profile/${user._id}`}><li>Hello, {user?.firstName}</li></Link>
//             }
//                    {
//               admin && <Link to={`/dashboard/sales`}><li>Dashboard</li></Link>
//             }


//           </ul>

//           <Link to={"/cart"} className='relative'>
//           <ShoppingCart/>
//           <span className='bg-pink-500 rounded-full absolute -top-3 -right-5 px-2 '> {cart?.items?.length}

//           </span>
//           </Link>

//           {
//             user ?<Button onClick={logout} className='bg-pink-600 text-white cursor-pointer'>Logout</Button> :<Button onClick={()=>navigate("/login")} className='bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer'>Login</Button>
//           }

//         </nav>

//       </div>

//     </header>

//   )
// }

// export default Navbar