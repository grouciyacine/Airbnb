"use client"
import Navbar from '@/app/components/Navbar'
import TimeAgo from 'react-timeago'
import useGetUser from '@/app/hooks/useGetUser'
import useHomeId from '@/app/hooks/useHomeId'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { TbToolsKitchen } from "react-icons/tb";
import { PiSwimmingPoolBold } from "react-icons/pi";
import { BiSolidWasher } from "react-icons/bi";
import { IoCarSportOutline } from "react-icons/io5";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { FaPlaystation } from "react-icons/fa";
import Button from '@/app/components/Button'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaChevronDown } from "react-icons/fa";
import Counter from '@/app/components/Counter'
import { FaAngleUp } from "react-icons/fa";
import axios from 'axios'
import { useSnapshot } from 'valtio'
import state from '@/app/config/store'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from '@/app/components/Map'
type Props = {
  params: Params
}

function HousePage({ params }: Props) {
  const [date, setDate] = useState<any>();
  const [toggle, setToggle] = useState(false)
  const home = useHomeId(params.id)
  const data = home?.data
  const user = useGetUser(data?.userId)
  const userData = user?.data
  var ONE_DAY = 1000 * 60 * 60 * 24;
  const snap = useSnapshot(state)
  const handle = useCallback(async () => {
    if (!user?.data) {
      toast.error('Pleas Login or Register', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
      });
  }else{
    if (date) {
      await axios.post('/api/Cheeck', {
        endDate: date[1]?.toLocaleDateString(),
        startDate: date[0]?.toLocaleDateString(),
        totalPrice: data?.price * (Math.round((date[1] - date[0]) / ONE_DAY) - 1),
        listingId: params?.id
      }).then(() => {
        toast("Reservation with success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
        .catch(() => {  
          toast.error('Pleas Login or Register', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
          })
    }
    toast.warn('Please Provide all information', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  }, [snap])
  return (
    <div className=''>
      <Navbar />
      {home?.isLoading ? 'loading ...' :
        <div className='m-10 relative z-10'>
          <h1 className='text-2xl font-semibold p-5'>{data.title}</h1>
          <Image src={data.imagesrc} alt='House' width={600} height={200} className='object-contain cursor-pointer rounded-md' />
          <h2 className='text-xl font-medium p-2'>{data.title}, {data.locationValue}</h2>
          <h3>{data?.gestCount} guests . {data?.roomAccount} bedrooms . {data?.bathroomAccount} bathrooms</h3>
          <div className='flex flex-col  md:flex-row '>
            <div className='md:w-1/2 lg:w-2/3 w-full'>
              <div className='translate-y-4 w-full h-[1px] bg-gray-300' />
              <div className='translate-y-6 flex flex-row justify-start items-start space-x-5'>
                <Image src={userData?.image} width={50} height={50} className='rounded-full ' alt='User' />
                <div className='flex flex-col it'>
                  <h3>{userData?.name}</h3>
                  <TimeAgo date={userData?.createdAt} className='text-gray-400' />
                </div>
              </div>
              <div className='translate-y-10 w-full h-[1px] bg-gray-300' />
              <h4 className='translate-y-14'>{data?.description}</h4>
              <div className='translate-y-16 w-full h-[1px] bg-gray-300' />
              <div className='mt-24'>
                <h1 className='text-xl font-semibold'>What this place offers</h1>
                <div className='grid grid-cols-2 gap-4 p-4'>
                  <div className='flex flex-row items-center justify-start space-x-3'>
                    <TbToolsKitchen size={24} />
                    <h4>Kitchen</h4>
                  </div>
                  <div className='flex flex-row items-center justify-start space-x-3'>
                    <PiSwimmingPoolBold size={24} />
                    <h4>Pool</h4>
                  </div>
                  <div className='flex flex-row items-center justify-start space-x-3'>
                    <PiTelevisionSimpleLight size={24} />
                    <h4>TV</h4>
                  </div>
                  <div className='flex flex-row items-center justify-start space-x-3'>
                    <BiSolidWasher size={24} />
                    <h4>Washer</h4>
                  </div>
                  <div className='flex flex-row items-center justify-start space-x-3'>
                    <IoCarSportOutline size={24} />
                    <h4>Free Parking</h4>
                  </div>
                  <div className='flex flex-row items-center justify-start space-x-3'>
                    <FaPlaystation size={24} />
                    <h4>PlayStation</h4>
                  </div>
                  <div className='translate-x-20'>
                    <Button title='See All amenities' type={true} />
                  </div>
                </div>
              </div>
              <div className='translate-y-4 w-full h-[1px] bg-gray-300' />
              <div className='mt-6'>
                <h1 className='text-xl font-semibold p-2'>{date ? Math.round((date[1] - date[0]) / ONE_DAY) - 1 : '0'} nights in {data?.locationValue}</h1>
                <Calendar onChange={(value: any) => setDate(value)} value={date} selectRange={true} />
              </div>
            </div>
            <div className='bg-white shadow-md shadow-gray-300 md:w-1/2 lg:w-2/5 w-full h-2/5 relative md:sticky top-4  md:top-0 p-4 md:ml-10 rounded-xl '>
              <div className='flex flex-col'>
                <h1><span className='font-bold'>${data?.price} </span>night</h1>
                <div className='  lg:w-96 h-2/3 m-4 border-gray-300 border-[1px] rounded-lg'>
                  <div className='flex flex-row justify-center items-center  border-b-2 border-gray-300'>
                    <div className='flex mr-3 p-3 flex-col border-r-[1px] border-gray-300'>
                      <h6 className='mr-12 text-xs'>CHECK-IN</h6>
                      <h5>{date ? date[0].toLocaleDateString() : 'Star date'}</h5>
                    </div>
                    <div className='flex flex-col mr-3'>
                      <h6 className='mr-3 text-xs'>CHECKOUT</h6>
                      <h5>{date ? date[1].toLocaleDateString() : 'End date'}</h5>
                    </div>
                  </div>
                  <div onClick={() => { setToggle(!toggle) }} className='p-4 relative cursor-pointer flex flex-row justify-between items-center'>
                    <div className='flex flex-col'>
                      <h5 className='text-sm'>GUEST</h5>
                      <h6 className='text-xs text-gray-300'>1 guest</h6>
                    </div>
                    {!toggle ? <FaChevronDown size={15} className='text-black' /> : <FaAngleUp size={15} className='text-black' />}

                  </div>

                  {
                    toggle && <div className='relative md:absolute  md:left-7 top-0 md:top-48 z-50 bg-white shadow-md shadow-gray-300 rounded-lg w-72 lg:w-96 '>
                      <Counter subtitle='Age 13+' title='Adults' Snap='Adults' />
                      <Counter subtitle='Ages 2-12' title='Children' Snap='Children' />
                      <Counter subtitle='under 2' title='Infants' Snap='Infants' />
                      <Counter subtitle='' title='Pets' Snap='Pets' />
                      <div onClick={() => { setToggle(!toggle) }} className='hover:bg-gray-200 duration-150 w-20 relative m-3 right-0 rounded-lg'>
                        <button className='text-black font-black border-b-black   border-b-2 m-3  '>Close</button>
                      </div>
                    </div>
                  }
                </div>
                <div onClick={handle}>
                  <Button title='Check availability' type={false} />
                </div>
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </div>
          </div>
          <div className='mt-6 w-[330px] h-[400px] md:w-full z-10'>
            <h1 className='text-xl font-semibold p-2'> Where you’ll be</h1>
            <Map big={false} center={data?.location?.latlng ? data?.location?.latlng : snap?.location?.latlng} />
          </div>
        </div>
      }
    </div>
  )
}

export default HousePage