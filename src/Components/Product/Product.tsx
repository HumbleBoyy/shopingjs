"use client"
import { FC } from 'react'
import { ProductType } from '../interface/interface'
import Link from 'next/link'
import CustomImage from '../Image/CustomImage'

const Product: FC<{product: ProductType}> = ({product}) => {
  return (

        <Link href={`/product/${product.id}`} className="h-96 flex flex-col bg-white p-6 rounded-lg group
          hover:scale-105 transition-transform ease-in-out duration-200
          border
        ">
          <div className='relative max-h-80 flex-1'>
            <CustomImage product={product} fill/>
          </div>
          <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{product.category}</h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4 line-clamp-1">{product.title}</h2>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Price: ${product.price}</h2>
          <p className="leading-relaxed text-base text-black line-clamp-3">{product.description}</p>
        </Link>
     
  )
}

export default Product
