

import FilterSidebar from '@/components/ui/FilterSidebar'
import ProductCard from '@/components/ui/ProductCard'
import { setProducts } from '@/redux/productSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Product = () => {

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [sortOrder, setSortOrder] = useState('')
  const [priceRange, setPriceRange] = useState([0, 99999999])

  const { products } = useSelector((store) => store.product)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getAllProducts = async () => {

    try {

      setLoading(true)

      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/product/list`
      )

      console.log(res)

      if (res.data.success) {
        setAllProducts(res.data.products)
        dispatch(setProducts(res.data.products))
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])


  useEffect(() => {

    if (allProducts.length === 0) return

    let filtered = [...allProducts]

    // Search
    if (search.trim() !== "") {

      filtered = filtered.filter((p) =>
        p.productName
          .toLowerCase()
          .includes(search.toLowerCase())
      )

    }

    // Category
    if (category !== "All") {

      filtered = filtered.filter(
        (p) => p.category === category
      )

    }

    // Brand
    if (brand !== "All") {

      filtered = filtered.filter(
        (p) => p.brand === brand
      )

    }

    // Price
    filtered = filtered.filter(
      (p) =>
        p.productPrice >= priceRange[0] &&
        p.productPrice <= priceRange[1]
    )

    // Sorting
    if (sortOrder === "lowToHigh") {

      filtered.sort(
        (a, b) => a.productPrice - b.productPrice
      )

    } else if (sortOrder === "highToLow") {

      filtered.sort(
        (a, b) => b.productPrice - a.productPrice
      )

    }

    dispatch(setProducts(filtered))

  }, [
    search,
    category,
    brand,
    sortOrder,
    priceRange,
    allProducts,
    dispatch,
  ])


  return (

    <div className="pt-20 pb-10 px-4 sm:px-5 md:px-6">

      <div
        className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          md:flex-row
          gap-6
          md:gap-7
          items-start
        "
      >

        {/* ================= SIDEBAR ================= */}

        <aside
          className="
            w-full
            md:w-[240px]
            lg:w-[250px]
            shrink-0
          "
        >

          <FilterSidebar

            search={search}
            setSearch={setSearch}

            brand={brand}
            setBrand={setBrand}

            category={category}
            setCategory={setCategory}

            allProducts={allProducts}

            priceRange={priceRange}
            setPriceRange={setPriceRange}

          />

        </aside>


        {/* ================= MAIN PRODUCT SECTION ================= */}

        <div className="flex flex-col flex-1 min-w-0 w-full">


          {/* Sort */}
          <div className="flex justify-end mb-5">

            <select

              className="
                w-full
                sm:w-[200px]
                md:w-[180px]
                border
                border-gray-300
                rounded-md
                px-3
                py-2
                text-sm
                outline-none
                focus:border-blue-500
                bg-white
              "

              value={sortOrder}

              onChange={(e) =>
                setSortOrder(e.target.value)
              }

            >

              <option value="">
                Choose Price Range
              </option>

              <option value="lowToHigh">
                Price : Low to High
              </option>

              <option value="highToLow">
                Price : High to Low
              </option>

            </select>

          </div>


          {/* ================= PRODUCT GRID ================= */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-5
              sm:gap-6
              md:gap-7
            "
          >

            {
              products
                .filter(Boolean)
                .map((product) => {

                  return (
                    <ProductCard
                      key={product?._id}
                      product={product}
                      loading={loading}
                    />
                  )

                })
            }

          </div>

        </div>

      </div>

    </div>

  )
}

export default Product