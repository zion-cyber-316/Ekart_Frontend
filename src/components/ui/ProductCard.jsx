import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setCart } from '@/redux/productSlice';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const ProductCard = ({product}) => {
    const {productImg ,productPrice ,productName, productDesc} = product
    const serverUrl = `${import.meta.env.VITE_URL}`;

    const nevigate = useNavigate()
    const dispatch = useDispatch()

    const accessToken = localStorage.getItem('accessToken')

    const addToCart = async (productId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_URL}/api/cart/add`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("Product added to Cart");
      dispatch(setCart(res.data.cart));
    }
  } catch (error) {
    console.log(error);
  }
};



    
  return (
    <div className="shadow-lg rounded-lg overflow-hidden h-max">
  <div className="w-full h-full aspect-square overflow-hidden">
    <img
    onClick={()=>nevigate(`/product/${product._id}`)}
      src={`${serverUrl}${productImg[0]?.url}`}
      alt=""
      className="w-full h-full transition-transform duration-300 hover:scale-105 p-5"
    />
  </div>

  <div className="px-2 space-y-1">
    <h1 className="font-semibold h-12 line-clamp-2">
      {productName}
    </h1>
   


    <h2 className="font-bold">
      ₹{productPrice}
    </h2>

    <Button onClick={()=>addToCart(product._id)} className="bg-pink-600 mb-3 w-full ">
      <ShoppingCart />
      Add to Cart
    </Button>
  </div>
</div>
  )
}

export default ProductCard
