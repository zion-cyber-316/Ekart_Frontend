
import Breadcrums from '@/components/ui/Breadcrums'
import ProductDesc from '@/components/ui/ProductDesc'
import ProductImg from '@/components/ui/ProductImg'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {

  const params = useParams()

  const productId = params.id

  const { products } = useSelector((store) => store.product)

  const product = products.find((item) => item._id === productId)

  return (
    <div className="pt-20 pb-10 px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">

      {/* Breadcrumb */}
      <Breadcrums product={product} />

      {/* Product Section */}
      <div
        className="
          mt-6
          sm:mt-8
          md:mt-10
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          lg:gap-12
          items-start
        "
      >

        {/* Product Images */}
        <div className="w-full">
          <ProductImg images={product.productImg} />
        </div>

        {/* Product Description */}
        <div className="w-full">
          <ProductDesc product={product} />
        </div>

      </div>

    </div>
  )
}

export default SingleProduct
