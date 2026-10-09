
import React, { useState } from 'react'

const ProductImg = ({ images }) => {
  const serverUrl = `${import.meta.env.VITE_URL}`;
  const imageLink = `${serverUrl}${images[0]?.url}`
  const [mainImg, setMainImg] = useState(imageLink)
  console.log(images)

   

  return (
  
 
    <div className='flex gap-5 w-max'>
      <div className='gap-5 flex flex-col'>
        {
          images.map((img) => {
            return (
              <img
              onClick={()=>setMainImg(`${serverUrl}${img.url}`)}
                src={`${serverUrl}${img.url}`}
                alt=""
                className='cursor-pointer w-20 h-20 border shadow-lg'
              />
            )
          })
        }
      </div>

      <img
        src={mainImg}
        alt=""
        className='w-[450px] border shadow-lg'
      />
    </div>
  )
}

export default ProductImg