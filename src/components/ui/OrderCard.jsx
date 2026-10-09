import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Button } from './button'
import { useNavigate } from 'react-router-dom';

const OrderCard = ({userOrder}) => {
     const serverUrl = `${import.meta.env.VITE_URL}`;
      const navigate = useNavigate()
     
  return (
<div className="p-3 sm:p-5 flex flex-col gap-3">

  <div className="w-full max-w-5xl mx-auto">

    {/* Header */}
    <div className="flex items-center gap-3 mb-5 sm:mb-6">

      <Button
        onClick={() => navigate(-1)}
        className="shrink-0"
      >
        <ArrowLeft size={20} />
      </Button>

      <h1 className="text-xl sm:text-2xl font-bold">
        Orders
      </h1>

    </div>


    {/* No Orders */}
    {
      userOrder?.length === 0 ? (

        <p className="text-gray-800 text-lg sm:text-2xl">
          No Orders found for this user
        </p>

      ) : (

        <div className="space-y-5 sm:space-y-6 w-full">

          {
            userOrder?.map((order) => (

              <div
                key={order._id}
                className="
                  w-full
                  shadow-lg
                  rounded-xl
                  sm:rounded-2xl
                  p-3
                  sm:p-5
                  border
                  border-gray-200
                  bg-white
                "
              >

                {/* ================= ORDER HEADER ================= */}

                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    gap-3
                    mb-4
                  "
                >

                  {/* Order ID */}

                  <div className="min-w-0">

                    <h2 className="text-sm sm:text-lg font-semibold">
                      Order ID:
                    </h2>

                    <p
                      className="
                        text-xs
                        sm:text-sm
                        text-gray-600
                        break-all
                        mt-1
                      "
                    >
                      {order._id}
                    </p>

                  </div>


                  {/* Amount */}

                  <div className="sm:text-right shrink-0">

                    <p className="text-xs sm:text-sm text-gray-500">
                      Amount:
                    </p>

                    <p className="text-sm sm:text-base font-bold text-gray-800">
                      {order.currency} {order.amount.toFixed(2)}
                    </p>

                  </div>

                </div>


                {/* ================= USER INFO ================= */}

                <div
                  className="
                    flex
                    flex-col
                    xs:flex-row
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-3
                    mb-4
                  "
                >

                  <div className="min-w-0">

                    <p className="text-sm text-gray-700 font-medium">
                      {order.user?.firstName || "Unknown"}{" "}
                      {order.user?.lastName}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 break-all">
                      Email: {order.user?.email || "N/A"}
                    </p>

                  </div>


                  {/* Status */}

                  <span
                    className={`
                      self-start
                      sm:self-auto
                      text-xs
                      sm:text-sm
                      text-white
                      px-3
                      py-1
                      rounded-lg
                      shrink-0

                      ${
                        order.status === "Paid"
                          ? "bg-green-500"
                          : order.status === "Failed"
                            ? "bg-red-500"
                            : "bg-orange-300"
                      }
                    `}
                  >
                    {order.status}
                  </span>

                </div>


                {/* ================= PRODUCTS ================= */}

                <div>

                  <h3 className="font-medium text-sm sm:text-base mb-2">
                    Products:
                  </h3>


                  <ul className="space-y-2">

                    {
                      order.products.map((product, index) => (

                        <li
                          key={index}
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            bg-gray-50
                            p-2
                            sm:p-3
                            rounded-lg
                            w-full
                          "
                        >

                          {/* Product Image */}

                          <img
                            onClick={() =>
                              navigate(
                                `/product/${product?.productId?._id}`
                              )
                            }

                            className="
                              w-14
                              h-14
                              sm:w-16
                              sm:h-16
                              object-contain
                              rounded-md
                              cursor-pointer
                              shrink-0
                              bg-white
                            "

                            src={`${serverUrl}${product.productId?.productImg?.[0]?.url}`}

                            alt={
                              product.productId?.productName ||
                              "Product"
                            }
                          />


                          {/* Product Name */}

                          <div
                            className="
                              flex-1
                              min-w-0
                            "
                          >

                            <p
                              className="
                                text-xs
                                sm:text-sm
                                text-gray-800
                                line-clamp-2
                                break-words
                              "
                            >
                              {product.productId?.productName}
                            </p>

                          </div>


                          {/* Price */}

                          <div
                            className="
                              w-full
                              sm:w-auto
                              sm:shrink-0
                              sm:text-right
                              border-t
                              sm:border-t-0
                              pt-2
                              sm:pt-0
                            "
                          >

                            <p className="text-xs sm:text-sm font-medium text-gray-800">
                              ₹{product.productId?.productPrice} ×{" "}
                              {product.quantity}
                            </p>

                          </div>

                        </li>

                      ))
                    }

                  </ul>

                </div>

              </div>

            ))
          }

        </div>

      )
    }

  </div>

</div>
  )
}

export default OrderCard
