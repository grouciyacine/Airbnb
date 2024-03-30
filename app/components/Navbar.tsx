'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiOutlineSearch,AiOutlineMenu } from 'react-icons/ai'
import { TfiWorld } from 'react-icons/tfi'
import Auth from './Auth'
import useCurrentUser from '../hooks/useCurrentUser'
import RentModal from './RentModal'
import { useRouter } from 'next/navigation'

type Props = {}

function Navbar({ }: Props) {
    const [rent,setRent]=useState(false)
    const { data: user } = useCurrentUser()
    const [openAuth,setOpenAuth]=useState(false)
    const [openPopup,setOpenPopup]=useState(false)
    const navigate=useRouter()
    return (
        <div className='relative flex flex-col-reverse  md:flex-row p-4 border-b-[1px] justify-around items-center my-2 border-gray-300 border-t-[1px]'>
            <Image src='/logo.png' width={100} height={50} alt='logo'  className='hidden md:flex'/>
            <ul className='flex flex-row  md:mx-4 md:px-2 border-[1px] justify-center items-center border-gray-300 rounded-full p-2'>
                <li className='mx-4 pr-4 cursor-pointer border-r-[1px] border-gray-300'>Anywhere</li>
                <li className='mx-4 cursor-pointer pr-4 border-r-[1px] border-gray-300'>Any weeks</li>
                <li className='mx-4 cursor-pointer'>2 guests </li>
                <div className='w-8 flex justify-center items-center h-8 rounded-full bg-rose-500 text-white'><AiOutlineSearch className='cursor-pointer' size={18} /></div>
            </ul>
            <div className='flex p-3 w-full md:w-fit md:p-0 flex-row justify-between md:justify-around space-x-7 md:space-x-0 items-center'>
                <div className='flex flex-row items-center justify-center md:mx-6'>
                                    <h4 className='hover:bg-gray-200 rounded-lg cursor-pointer p-1' onClick={()=>setRent(!rent)}>Airbnb your Home </h4>
                <TfiWorld size={18} className=''/>
                </div>
                <div onClick={()=>{setOpenPopup(!openPopup)}} className='cursor-pointer w-16 h-9 flex items-center justify-around border-[1px] border-gray-300 rounded-full'>
                    <AiOutlineMenu  size={18}/>
                    {user?.others?.image?<img className='w-6 h-6 object-contain rounded-full' src={user?.others?.image} alt='user'/>
                    :<img className='w-5 h-5 object-contain rounded-full' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' alt='user'/>}
                </div>
            </div>
            {openPopup && <div className='absolute top-20 right-20 bg-white z-40 w-52 h-52 shadow-lg shadow-gray-400 rounded-lg flex flex-col justify-start items-start '>
                {user?.others?<span className='font-bold p-2 translate-y-2 hover:bg-gray-100 cursor-pointer w-full'>Welcome {user?.others?.name}</span>:
                <div>
                <h4 onClick={()=>{setOpenAuth(!openAuth);setOpenPopup(!openPopup)}}  className='font-bold p-2 translate-y-2 hover:bg-gray-100 cursor-pointer w-full'>Sign up</h4>
                <h4 onClick={()=>{setOpenAuth(!openAuth);setOpenPopup(!openPopup)}}  className='p-2  hover:bg-gray-100 cursor-pointer w-full'>Log in</h4>
</div>
            }
                <h4 onClick={()=>{setOpenAuth(!openAuth);setOpenPopup(!openPopup)}}  className='font-bold p-2 translate-y-2 hover:bg-gray-100 cursor-pointer w-full'>Sign up</h4>
                <h4 onClick={()=>{setOpenAuth(!openAuth);setOpenPopup(!openPopup)}}  className='p-2  hover:bg-gray-100 cursor-pointer w-full'>Log in</h4>
                <div className='w-full h-[1px] bg-gray-200'/>
                <h4 className='p-2  hover:bg-gray-100 cursor-pointer w-full' onClick={()=>{navigate.push(`/favorite/${user?.others?.id}`)}}>Gift Cards</h4>
                <h4 className='p-2  hover:bg-gray-100 cursor-pointer w-full'>Air bnb Home</h4>
                <h4 className='p-2  hover:bg-gray-100 cursor-pointer w-full'>Help center</h4>

                </div>}
            {openAuth && <Auth setOpenAuth={setOpenAuth}/>}
            {rent && <RentModal setOpenHome={setRent}/>}
        
        </div>
    )
}

export default Navbar