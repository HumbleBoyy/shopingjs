"use client"
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'

const Navbar = () => {
  const handleAlert = () => {
    toast("Coming Soon....")
  }
  return (
    <div>
      <header className="text-white-600 body-font bg-teal-600">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl text-white">NextJS.Shop</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href={"/"} className="mr-5 hover:text-gray-900">Home</Link>
      <button className="mr-5 hover:text-gray-900" onClick={handleAlert}>All Products</button>
    </nav>
     <Link href={"/shopping-cart"}>
     <button className="
    inline-flex items-center 
    bg-blue-800 border-0 py-1
    mr-1 
    px-3 focus:outline-none 
    hover:bg-gray-200 
    hover:text-black 
    rounded text-base 
    mt-4 md:mt-0
    "
    >
        My Purchases
    </button>
     </Link>
  </div>
</header>
    </div>
  )
}

export default Navbar
