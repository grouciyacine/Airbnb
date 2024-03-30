"use client"
import Navbar from '@/app/components/Navbar'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'
import useFavorites from '@/app/hooks/favorites'
import CartItem from '@/app/components/CartItem'
type Props = {
  params: Params
}

function Favorite({ params }: Props) {
  const favorites=useFavorites()
  console.log(favorites)
  if(favorites?.data){
  return (
    <div className=''>
      <Navbar />
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {favorites?.data?.map((data: any, key: number) => (
                    <CartItem key={key} data={data} />
                ))}
            </div>
    </div>
  )
  }else{
    return( null)
  }

}

export default Favorite