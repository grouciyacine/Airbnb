'use client'
import React from 'react'
import Navbar from '../components/Navbar'
import IconsNavbar from '../components/IconsNavbar'
import Filter from '../components/Filter'

type Props = {}

function Home({ }: Props) {
  return (
    <div className='w-full'>
      <Navbar />
      <IconsNavbar />
      <Filter/>
    </div>
  )
}

export default Home