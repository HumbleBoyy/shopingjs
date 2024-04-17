"use client"

import CustomImage from "@/Components/Image/CustomImage";
import { ProductType } from "@/Components/interface/interface";
import { Dialog } from "@headlessui/react";
import { useParams,useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {StarIcon as StarIconOutline} from "@heroicons/react/24/outline";
import {StarIcon} from '@heroicons/react/24/solid';
import Link from "next/link";
import { toast } from "react-toastify";

const ProductDetailedPage = () => {

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [isOpen, setIsOpen] = useState(true);
  const [isAdded, setIsAdded] = useState(false)

  const {id} = useParams();
  const router = useRouter();

  const handleClickAdd = ()=> {
    const products: ProductType[] = JSON.parse(localStorage.getItem('carts')as string) || [];
    const isTheProductExist = products.find(c=> c.id === product?.id)


    if(isTheProductExist){
            const updateProductData = products.map( c => {
              if(c.id === product?.id){
                return{
                  ...c,
                  quantity: c.quantity + 1,
                }
              }
              return c
            })
            localStorage.setItem('carts', JSON.stringify(updateProductData))

    }else{

      const data = [...products, {...product, quantity: 1}]
      localStorage.setItem('carts', JSON.stringify(data))
    }



    toast("Product added successfully!")
  }

  useEffect(()=> {
       async function getData() {
          const res = await fetch(
            `https://fakestoreapi.com/products/${id}`
          );
          const product = await res.json();
          setProduct(product)
          setLoading(false)
       }

       getData()
  }, [id]);
  return (
     <Dialog 
     open={isOpen} 
     onClose={()=> {
      setIsOpen(false);
       router.back()
     }}
     className="relative z-50"
     >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
             <Dialog.Panel
              className={'mx-auto max-w-3xl rounded bg-white p-10'}
             >
                {loading ? (
                  <>
                    <div className="h-8 w-8 rounded-full border-2 border-dotted border-b-blue-600"/>
                  </>
                ): (
                  <div className="flex gap-x-8 h-96">
                    {product?.image && (
                      <div className="relative w-72 h-full hidden md:inline">
                         <CustomImage product={product} fill/>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                       <div className="flex-1">
                          <div className="flex-1">
                              <h4 className="font-semibold  text-black line-clamp-1">
                                {product?.title}
                              </h4>
                              <p className="font-medium text-sm text-black">
                                Price: ${product?.price}
                              </p>
                              <div className="flex items-center text-sm my-4">
                                    <p className="text-gray-600">{product?.rating.rate}</p>
                                    {product?.rating.rate && (
                                       <div className="flex items-center ml-2 mr-6">
                                           {Array.from({length:Math.floor(product.rating.rate)},
                                            (_, index)  => (
                                              <StarIcon key={index} className="h-4 w-4 text-yellow-500"/>
                                            )                                         
                                          )}

                                          {Array.from({length: 5 - Math.floor(product.rating.rate)}, 
                                        (_, index)=> (
                                          <StarIconOutline key={index} className="h-4 w-4 text-yellow-500"/>
                                        ))}
                                       </div>
                                    )}
                                    <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                                      See all {product?.rating.count} reviews
                                    </p>
                              </div>
                              <p className="text-black line-clamp-5">{product?.description} </p>
                          </div>

                          <div className="space-y-3 text-sm mt-10">
                             <button className="
                                  py-2
                                 button w-full
                                 bg-blue-600 
                                 text-white
                                 border-blue-600
                                 hover:bg-blue-500
                                 rounded
                                 "
                                 onClick={handleClickAdd}
                                  >
                                Add to bag
                             </button>

                {/* <Link href="/poduct"> */}
                <button className="
                                   py-2
                                   mt-2
                                   button w-full
                                   bg-blue-600 
                                   text-white
                                   border-blue-600
                                   hover:bg-blue-500
                                   rounded
                                  "
                                  onClick={()=> window.location.reload()}
                                  >
                                   See Full Details
                             </button>
                {/* </Link> */}
                          </div>
                       </div>
                    </div>
                  </div>
                )}
             </Dialog.Panel>
          </div>
        </div>
     </Dialog>
  )
}

export default ProductDetailedPage
