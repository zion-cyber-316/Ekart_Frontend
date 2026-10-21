
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { addAddress, deleteAddress, setCart, setSelectedAddress } from '@/redux/productSlice'
import axios from 'axios'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'



const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  })
  const dispatch = useDispatch()
  const nevigate = useNavigate()

  const {cart, addresses, selectedAddress } = useSelector((state) => state.product)

  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true
  )

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    dispatch(addAddress(formData))
    setShowForm(false)
  }

  const subtotal = cart.totalPrice
const shipping = subtotal > 50 ? 0 : 10
const tax = parseFloat((subtotal * 0.05).toFixed(2))
const total = subtotal + shipping + tax

const handlePayment = async()=>{
  const accessToken = localStorage.getItem("accessToken")
  try{
    const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/order/add`, {
  products: cart?.items?.map(item => ({
    productId: item.productId._id,
    quantity: item.quantity
  })),
  tax,
  shipping,
  amount: total,
  currency: "INR"
}, {
  headers: { Authorization: `Bearer ${accessToken}` }
})

if (!data.success) return toast.error("Something went wrong")

console.log("Razorpay data:", data);

const options = {
  key: 'rzp_test_Tnh3hQjGVG4CF5',
  amount: data.order.amount,
  currency: data.order.currency,
  order_id: data.order.id, // Order ID from backend
  name: "Ekart",
  description: "Order Payment",

  handler: async function (response) {
    try {
      console.log(accessToken)
      const verifyRes = await axios.post(`${import.meta.env.VITE_URL}/api/order/verify-payment`,
      response, {
        headers: { Authorization: `Bearer ${accessToken}` }

      })

      if (verifyRes.data.success) {
        toast.success("✅ Payment Successfull!")
        dispatch(setCart({ items: [], totalPrice: 0 }))
        nevigate("/order-success")
      } else {
        toast.error("❌ Payment Verification failed")
      }

 
} catch(error){
  toast.error("error verify Payment")
}



},
modal: {
  ondismiss: async function () {
    // Handle user closing the popup
    console.log(accessToken)
    await axios.post(`${import.meta.env.VITE_URL}/api/order/verify-payment`, {
      razorpay_order_id: data.order.id,
      paymentFailed: true
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    toast.error('Payment Canceled aur Failed')
  }
},
prefill :{
  name : formData.fullName,
  email : formData.email,
  contact : formData.phone
},
theme : {color : "#F47286"}




}


const rzp = new window.Razorpay(options)

// Listen for payment failures
rzp.on("payment.failed", async function (response) {
    await axios.post(`${import.meta.env.VITE_URL}/api/order/verify-payment`, {
        razorpay_order_id: response.razorpay_order_id,
    }, {
        paymentFailed: true
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    toast.error("Payment Failed. Please try again")
})

rzp.open()

}catch(error){
  console.error(error)
  toast.error("Something went wrong while processing Payment")
    
  }
}


  return (


<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">

  <div
    className="
      grid
      grid-cols-1
      lg:grid-cols-2
      items-start
      gap-6
      lg:gap-10
      max-w-7xl
      mx-auto
    "
  >

    {/* ================= LEFT SIDE ================= */}

    <div className="space-y-4 p-4 sm:p-6 bg-white rounded-lg w-full">

      {showForm ? (

        <>
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">
              Full Name
            </Label>

            <Input
              id="fullName"
              name="fullName"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full"
            />
          </div>


          {/* Phone */}
          <div>
            <Label htmlFor="Phone">
              Phone No
            </Label>

            <Input
              id="Phone"
              name="Phone"
              required
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full"
            />
          </div>


          {/* Email */}
          <div>
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>


          {/* Address */}
          <div>
            <Label htmlFor="address">
              Address
            </Label>

            <Input
              id="address"
              name="address"
              required
              placeholder="123 street, Area"
              value={formData.address}
              onChange={handleChange}
              className="w-full"
            />
          </div>


          {/* City + State */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <Label htmlFor="city">
                City
              </Label>

              <Input
                id="city"
                name="city"
                required
                placeholder="Bareilly"
                value={formData.city}
                onChange={handleChange}
                className="w-full"
              />
            </div>


            <div>
              <Label htmlFor="state">
                State
              </Label>

              <Input
                id="state"
                name="state"
                required
                placeholder="Uttar Pradesh"
                value={formData.state}
                onChange={handleChange}
                className="w-full"
              />
            </div>

          </div>


          {/* Zip + Country */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <Label htmlFor="zip">
                Zip Code
              </Label>

              <Input
                id="zip"
                name="zip"
                required
                placeholder="243201"
                value={formData.zip}
                onChange={handleChange}
                className="w-full"
              />
            </div>


            <div>
              <Label htmlFor="country">
                Country
              </Label>

              <Input
                id="country"
                name="country"
                required
                placeholder="India"
                value={formData.country}
                onChange={handleChange}
                className="w-full"
              />
            </div>

          </div>


          {/* Save Button */}

          <Button
            onClick={handleSave}
            className="w-full"
          >
            Save & Continue
          </Button>

        </>

      ) : (

        /* ================= SAVED ADDRESSES ================= */

        <div className="space-y-4">

          <h2 className="text-lg font-semibold">
            Saved Addresses
          </h2>


          {addresses.map((addr, index) => {

            return (

              <div
                key={index}
                onClick={() =>
                  dispatch(setSelectedAddress(index))
                }
                className={`
                  border
                  p-4
                  rounded-md
                  cursor-pointer
                  relative
                  pr-16
                  break-words

                  ${
                    selectedAddress === index
                      ? "border-pink-600 bg-pink-50"
                      : "border-gray-300"
                  }
                `}
              >

                <p className="font-medium">
                  {addr.fullName}
                </p>

                <p className="text-sm">
                  {addr.phone}
                </p>

                <p className="text-sm break-all">
                  {addr.email}
                </p>

                <p className="text-sm leading-6">
                  {addr.address}, {addr.city}, {addr.state},{" "}
                  {addr.zip}, {addr.country}
                </p>


                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(deleteAddress(index))
                  }}
                  className="
                    absolute
                    top-2
                    right-2
                    text-red-500
                    hover:text-red-700
                    text-sm
                  "
                >
                  Delete
                </button>

              </div>

            )

          })}


          {/* Add Address */}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowForm(true)}
          >
            + Add New Address
          </Button>


          {/* Checkout */}

          <Button
            onClick={handlePayment}
            disabled={selectedAddress === null}
            className="w-full bg-pink-600 hover:bg-pink-700"
          >
            Proceed To Checkout
          </Button>

        </div>

      )}

    </div>


    {/* ================= RIGHT SIDE ORDER SUMMARY ================= */}

    <div className="w-full lg:sticky lg:top-24">

      <Card className="w-full">

        <CardHeader>
          <CardTitle>
            Order Summary
          </CardTitle>
        </CardHeader>


        <CardContent className="space-y-4">

          {/* Subtotal */}

          <div className="flex justify-between gap-4 text-sm sm:text-base">

            <span>
              Subtotal ({cart.items.length}) items
            </span>

            <span className="font-medium">
              {subtotal.toLocaleString("en-IN")}
            </span>

          </div>


          {/* Shipping */}

          <div className="flex justify-between text-sm sm:text-base">

            <span>
              Shipping
            </span>

            <span>
              {shipping}
            </span>

          </div>


          {/* Tax */}

          <div className="flex justify-between text-sm sm:text-base">

            <span>
              Tax
            </span>

            <span>
              {tax}
            </span>

          </div>


          <Separator />


          {/* Total */}

          <div className="flex justify-between gap-4 font-bold text-lg">

            <span>
              Total
            </span>

            <span>
              {total}
            </span>

          </div>


          {/* Information */}

          <div className="text-xs sm:text-sm text-muted-foreground pt-4 space-y-1">

            <p>
              ✓ Free shipping on orders over 299
            </p>

            <p>
              ✓ 30-days return policy
            </p>

            <p>
              ✓ Secure checkout with SSL encryption
            </p>

          </div>

        </CardContent>

      </Card>

    </div>

  </div>

</div>
  )
}

export default AddressForm