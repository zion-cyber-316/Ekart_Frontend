

import { Input } from '@base-ui/react'
import { Button } from '@/components/ui/button'
import React from 'react'

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  setPriceRange,
  allProducts,
  priceRange
}) => {

  const Categories = allProducts.map((p) => p.category)
  const UniqueCategory = ["All", ...new Set(Categories)]

  const Brands = allProducts.map((p) => p.brand)
  const UniqueBrand = ["All", ...new Set(Brands)]


  const handleCategoryClick = (val) => {
    setCategory(val)
  }


  const handleBrandChange = (e) => {
    setBrand(e.target.value)
  }


  const handleMinChange = (e) => {

    const value = Number(e.target.value)

    if (value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]])
    }

  }


  const handleMaxChange = (e) => {

    const value = Number(e.target.value)

    if (value >= priceRange[0]) {
      setPriceRange([priceRange[0], value])
    }

  }


  const resetFilters = () => {

    setSearch("")
    setCategory("All")
    setBrand("All")
    setPriceRange([0, 999999])

  }


  return (

    <div
      className="
        bg-gray-100
        mt-0
        md:mt-0
        p-4
        rounded-md
        h-max
        w-full
        md:w-64
        shrink-0
      "
    >

      {/* Search */}

      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          bg-white
          p-2
          rounded-md
          border-gray-400
          border-2
          w-full
        "
      />


      {/* Category */}

      <h1 className="mt-5 font-semibold text-xl">
        Category
      </h1>


      <div className="flex flex-col gap-2 mt-3">

        {UniqueCategory.map((item, index) => (

          <div
            key={index}
            className="flex items-center gap-2"
          >

            <input
              type="radio"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
              id={`category-${index}`}
              name="category"
              value={item}
            />

            <label
              htmlFor={`category-${index}`}
              className="cursor-pointer"
            >
              {item}
            </label>

          </div>

        ))}

      </div>


      {/* Brands */}

      <h1 className="mt-5 font-semibold text-xl">
        Brand
      </h1>


      <select
        value={brand}
        onChange={handleBrandChange}
        className="
          bg-white
          w-full
          p-2
          border-gray-200
          border-2
          rounded-md
          mt-2
        "
      >

        {UniqueBrand.map((item, index) => (

          <option
            key={index}
            value={item}
          >
            {item.toUpperCase()}
          </option>

        ))}

      </select>


      {/* Price Range */}

      <h1 className="mt-5 font-semibold text-xl mb-3">
        Price Range
      </h1>


      <div className="flex flex-col gap-2">

        <label className="text-sm">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>


        {/* Min Max Inputs */}

        <div className="flex gap-2 items-center">

          <input
            type="number"
            min="0"
            max="5000"
            className="
              w-full
              min-w-0
              p-1
              border
              border-gray-300
              rounded
            "
            value={priceRange[0]}
            onChange={handleMinChange}
          />

          <span>-</span>

          <input
            type="number"
            min="0"
            max="99999999"
            className="
              w-full
              min-w-0
              p-1
              border
              border-gray-300
              rounded
            "
            value={priceRange[1]}
            onChange={handleMaxChange}
          />

        </div>


        {/* Minimum Range */}

        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          className="w-full"
          value={priceRange[0]}
          onChange={handleMinChange}
        />


        {/* Maximum Range */}

        <input
          type="range"
          min="0"
          max="99999999"
          step="100"
          className="w-full"
          value={priceRange[1]}
          onChange={handleMaxChange}
        />

      </div>


      {/* Reset Button */}

      <Button
        onClick={resetFilters}
        className="
          bg-pink-600
          hover:bg-pink-700
          text-white
          mt-5
          cursor-pointer
          w-full
        "
      >
        Reset Filters
      </Button>

    </div>

  )
}

export default FilterSidebar