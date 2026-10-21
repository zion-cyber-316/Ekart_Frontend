import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userLogo  from "../../assets/user.png"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { setCart } from '@/redux/productSlice'
import axios from 'axios'

const Cart = () => {
  const {cart} = useSelector((store)=>store.product)
   const serverUrl = `${import.meta.env.VITE_URL}`;

   const navigate = useNavigate()
  console.log(cart)

  const subtotal = Number(cart?.totalPrice) || 0;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = subtotal * 0.05; // 5%
  const total = subtotal + shipping + tax;
  const dispatch = useDispatch()

  const accessToken = localStorage.getItem("accessToken")

  const handleUpdateQuantity = async (productId, type) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_URL}/api/cart/update`,{ productId, type },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) {
      dispatch(setCart(res.data.cart));
    }
  } catch (error) {
    console.log(error);
  }
};


// const handleRemove = async(productId)=>{
//     try {
//     const res = await axios.delete(`${import.meta.env.VITE_URL}/api/cart/delete`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//          data :{productId}
//       }
//     );

//     if (res.data.success) {
//       dispatch(setCart(res.data.cart));
//     }
//   } catch (error) {
//     console.log(error);
//   }

// }


const handleRemove = async (productId) => {
  try {
    const res = await axios.delete(
      `${serverUrl}/api/cart/delete`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      }
    );

    if (res.data.success) {
      dispatch(setCart(res.data.cart));
    }
  } catch (error) {
    console.error(
      "Remove cart item error:",
      error.response?.data || error.message
    );
  }
};

  return (


<div className="pt-20 bg-gray-50 min-h-screen px-4 sm:px-6 md:px-8 pb-10">

  {cart?.items?.length > 0 ? (

    <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-7">
        Shopping Cart
      </h1>


      {/* Main Layout */}
      <div
        className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          lg:flex-row
          gap-6
          lg:gap-7
          items-start
        "
      >

        {/* ================= CART ITEMS ================= */}

        <div className="flex flex-col gap-5 flex-1 w-full">

          {cart?.items?.map((product, index) => {

            return (

              <Card
                key={index}
                className="w-full"
              >

                <div
                  className="
                    p-3
                    sm:p-4
                    md:p-5
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-4
                  "
                >

                  {/* Product Image + Details */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      flex-1
                      min-w-0
                    "
                  >

                    <img
                      src={
                        `${serverUrl}${product?.productId?.productImg?.[0]?.url}`
                      }
                      alt={product?.productId?.productName || "Product"}
                      className="
                        w-20
                        h-20
                        sm:w-24
                        sm:h-24
                        object-contain
                        rounded-md
                        shrink-0
                        bg-gray-50
                      "
                    />


                    <div className="min-w-0 flex-1">

                      <h1
                        className="
                          font-semibold
                          text-sm
                          sm:text-base
                          line-clamp-2
                        "
                      >
                        {product?.productId?.productName}
                      </h1>

                      <p className="mt-1 text-gray-600 text-sm">
                        ₹{product?.productId?.productPrice}
                      </p>

                    </div>

                  </div>


                  {/* Quantity */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      sm:justify-center
                      gap-3
                      shrink-0
                    "
                  >

                    <Button
                      onClick={() =>
                        handleUpdateQuantity(
                          product.productId._id,
                          "decrease"
                        )
                      }
                      variant="outline"
                      className="w-9 h-9"
                    >
                      -
                    </Button>


                    <span className="font-semibold min-w-5 text-center">
                      {product.quantity}
                    </span>


                    <Button
                      onClick={() =>
                        handleUpdateQuantity(
                          product.productId._id,
                          "increase"
                        )
                      }
                      variant="outline"
                      className="w-9 h-9"
                    >
                      +
                    </Button>

                  </div>


                  {/* Total Price */}

                  <p
                    className="
                      font-semibold
                      text-sm
                      sm:text-base
                      sm:w-24
                      sm:text-right
                    "
                  >
                    ₹
                    {product?.productId?.productPrice *
                      product?.quantity}
                  </p>


                  {/* Remove */}

                  <p
                    onClick={() =>
                      handleRemove(product?.productId?._id)
                    }
                    className="
                      flex
                      items-center
                      gap-1
                      text-red-500
                      cursor-pointer
                      text-sm
                      hover:text-red-700
                      shrink-0
                    "
                  >

                    <Trash2 className="w-4 h-4" />

                    Remove

                  </p>

                </div>

              </Card>

            )

          })}

        </div>


        {/* ================= ORDER SUMMARY ================= */}

        <div className="w-full lg:w-[380px] xl:w-[400px] shrink-0">

          <Card className="w-full">

            <CardHeader>

              <CardTitle className="text-lg sm:text-xl">
                Order Summary
              </CardTitle>

            </CardHeader>


            <CardContent className="space-y-4">

              {/* Subtotal */}

              <div className="flex justify-between gap-3 text-sm sm:text-base">

                <span>
                  Subtotal ({cart?.items?.length} items)
                </span>

                <span className="font-medium">
                  ₹{cart?.totalPrice?.toLocaleString("en-IN")}
                </span>

              </div>


              {/* Shipping */}

              <div className="flex justify-between text-sm sm:text-base">

                <span>
                  Shipping
                </span>

                <span>
                  ₹{shipping}
                </span>

              </div>


              {/* Tax */}

              <div className="flex justify-between text-sm sm:text-base">

                <span>
                  Tax (5%)
                </span>

                <span>
                  ₹{tax}
                </span>

              </div>


              {/* Total */}

              <div
                className="
                  flex
                  justify-between
                  gap-3
                  font-semibold
                  text-lg
                  border-t
                  pt-4
                "
              >

                <span>
                  Total
                </span>

                <span>
                  ₹{total}
                </span>

              </div>


              {/* Buttons */}

              <div className="space-y-3 pt-4">

                {/* Promo */}

                <div className="flex gap-2">

                  <Input
                    placeholder="Promo Code"
                    className="min-w-0"
                  />

                  <Button
                    variant="outline"
                    className="shrink-0"
                  >
                    Apply
                  </Button>

                </div>


                {/* Place Order */}

                <Button
                  onClick={() => navigate("/address")}
                  className="
                    w-full
                    bg-pink-600
                    hover:bg-pink-700
                  "
                >
                  PLACE ORDER
                </Button>


                {/* Continue Shopping */}

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link to="/products">
                    Continue Shopping
                  </Link>
                </Button>

              </div>


              {/* Information */}

              <div className="text-xs sm:text-sm text-muted-foreground pt-4 space-y-1">

                <p>
                  * Free shipping on orders over 299
                </p>

                <p>
                  * 30-days return policy
                </p>

                <p>
                  * Secure checkout with SSL encryption
                </p>

              </div>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>

  ) : (

    /* ================= EMPTY CART ================= */

    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        min-h-[60vh]
        p-6
        text-center
      "
    >

      {/* Icon */}

      <div className="bg-pink-100 p-5 sm:p-6 rounded-full">

        <ShoppingCart
          className="
            w-12
            h-12
            sm:w-16
            sm:h-16
            text-pink-600
          "
        />

      </div>


      {/* Title */}

      <h2 className="mt-6 text-xl sm:text-2xl font-bold text-gray-800">
        Your Cart is Empty
      </h2>


      {/* Description */}

      <p className="mt-2 text-sm sm:text-base text-gray-600">
        Looks like you haven't added anything to your cart yet
      </p>


      {/* Button */}

      <Button
        onClick={() => navigate("/products")}
        className="
          mt-6
          bg-pink-600
          text-white
          py-3
          px-6
          hover:bg-pink-700
        "
      >
        Start Shopping
      </Button>

    </div>

  )}

</div>
  )
}

export default Cart
