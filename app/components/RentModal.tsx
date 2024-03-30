import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { slideAnimation } from '../config/motion'
import { AiOutlineClose } from 'react-icons/ai'
import Button from './Button'
import { categories } from './IconsNavbar'
import RentIcons from './RentIcons'
import { useSearchParams } from 'next/navigation'
import Location from './Location'
import dynamic from 'next/dynamic'
import { useSnapshot } from 'valtio'
import state from '../config/store'
import Counter from './Counter'
import ImageUpload from './ImageUpload'
import Input from './Input'
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from '@/app/components/Map'
import useCurrentUser from '../hooks/useCurrentUser'
type Props = {
    setOpenHome: any
}

function RentModal({ setOpenHome }: Props) {
    const { data: user } = useCurrentUser()
    const params = useSearchParams()
    const snap = useSnapshot(state)
    const [input, setInput] = useState({
        title: '',
        description: ''
    })
    const [price, setPrice] = useState<any>()
    const category1 = params?.get('category')
    const handleClick = () => {
        state.position = 'location'
    }
    const handleMap = () => {
        state.position = 'basic'
    }
    const handleAddPhoto = () => {
        state.position = 'photo'
    }
    const handleAddDescription = () => {
        state.position = 'description'
    }
    const handleAddPrice = () => {
        state.position = 'price'
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value)
    }

    useEffect(() => {
        state.title = input.title
        state.description = input.description
        state.price = Number(price)
    }, [input, price, snap.price])
    const Map = useMemo(() => dynamic(() => import('./Map'), {
        ssr: false
    }), [snap.location])
    const addHome = useCallback(async () => {
        if (!user?.others?.name) {
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
        }else{        if (snap) {
            await axios.post('/api/homes', {
                title: snap.title, description: snap.description,
                price: snap.price, imagesrc: snap.image, roomAccount: snap.roomCount,
                bathroomAccount: snap.bathroomCount, gestCount: snap.guestCount,
                locationValue: snap.location.label, type: snap.type,location:snap.location
            }).then((res) => {
                console.log(res.data); setOpenHome(false); Object.assign(state, {
                    type: '',
                    location: {
                        values: '',
                        label: '',
                        flag: '',
                        latlng: [51, -0.09],
                        region: '',
                    },
                    image: '',
                    position: 'type',
                    guestCount: 0,
                    roomCount: 0,
                    bathroomCount: 0,
                    title: '',
                    description: '',
                    price: 0.0,
                })
            }).catch((err) => console.log(err))
        }
}

    }, [snap])
    console.log(snap)
    if (snap.position === 'type') {
        return (
            <motion.div {...slideAnimation('top')} className={`absolute top-14 z-40  bg-white flex justify-center  w-2/5   my-9 border-[1px] border-gray-400 rounded-xl `}>
                <div className='flex flex-col justify-start items-start w-full'>
                    <AiOutlineClose size={20} onClick={() => setOpenHome(false)} className='absolute mt-2 ml-3 cursor-pointer' />
                    <div className='p-2'>
                        <h1 className='text-xl mx-3 font-bold text-center  py-2 w-full border-b border-gray-300'>
                            Airbnb Your Home
                        </h1>
                        <h1 className='mx-3 p-2'>Which of the best describe your place? </h1>
                        <h6 className='text-sm  text-gray-300 mx-6'>Pick a category</h6>
                        <ul className='grid grid-cols-2 mx-8 gap-x-24 gap-2'>
                            {categories.map((category, key) => (
                                <RentIcons key={key} Icone={category.icon} title={category.label} selected={category1 === category.label} />
                            ))}
                        </ul>
                    </div>
                    <div onClick={handleClick} className='flex flex-col justify-center items-center w-full'>
                        <Button type={false} title='Next' />
                    </div>
                </div>
            </motion.div>
        )
    } else if (snap.position === 'location') {
        return (
            <motion.div {...slideAnimation('top')} className={`absolute z-40 top-14  bg-white flex justify-center  w-2/5   my-9 border-[1px] border-gray-400 rounded-xl `}>
                <div className='flex relative  flex-col justify-start items-start w-full'>
                    <AiOutlineClose size={20} onClick={() => setOpenHome(false)} className='absolute mt-2 ml-3 cursor-pointer' />
                    <div className='p-2'>
                        <h1 className='text-xl  font-bold text-center w-[500px] py-2  border-b border-gray-300'>
                            Airbnb Your Home
                        </h1>
                        <h1 className='mx-3 p-2 font-bold'>Where is your place located? </h1>
                        <h6 className='text-sm  text-gray-300 mx-6'>Help to located</h6>
                    </div>
                    <div className='w-[460px] m-3 z-40 '>
                        <Location />
                        <div className='pt-3'>
                            <Map center={snap?.location?.latlng} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full'>
                        <div onClick={handleMap}>
                            <Button type={false} title='Next' />
                        </div>
                        <div onClick={() => state.position = 'type'}>
                            <Button type={true} title='Back' />
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    } else if (snap.position === 'basic') {
        return (
            <motion.div {...slideAnimation('top')} className={`z-40 absolute top-14  bg-white flex justify-center  w-2/5   my-9 border-[1px] border-gray-400 rounded-xl `}>
                <div className='flex relative  flex-col justify-start items-start w-full'>
                    <AiOutlineClose size={20} onClick={() => setOpenHome(false)} className='absolute mt-2 ml-3 cursor-pointer' />
                    <div className='p-2'>
                        <h1 className='text-xl  font-bold text-center w-[500px] py-2  border-b border-gray-300'>
                            Airbnb Your Home
                        </h1>
                        <h1 className='mx-3 p-2 font-bold'>Share some basics about your place </h1>
                        <h6 className='text-sm  text-gray-400 mx-6'>What amenities do you have? </h6>
                    </div>
                    <Counter subtitle='How many guests do you allow?' Snap='guests' title='Guests' />
                    <hr />
                    <Counter subtitle='How many rooms do you have?' title='Rooms' Snap='rooms' />
                    <hr />
                    <Counter subtitle='How many bathroom do you have?' title='Bathrooms' Snap='bathrooms' />
                    <div className='flex flex-col justify-center items-center w-full '>
                        <div onClick={handleAddPhoto}>
                            <Button type={false} title='Next' />
                        </div>
                        <div onClick={() => state.position = 'location'}>
                            <Button type={true} title='Back' />
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    } else if (snap.position === 'photo') {
        return (
            <motion.div {...slideAnimation('top')} className={`absolute top-14 z-40  bg-white flex justify-center  w-2/5   my-9 border-[1px] border-gray-400 rounded-xl `}>
                <div className='flex relative  flex-col justify-start items-start w-full'>
                    <AiOutlineClose size={20} onClick={() => setOpenHome(false)} className='absolute mt-2 ml-3 cursor-pointer' />
                    <div className='p-2'>
                        <h1 className='text-xl  font-bold text-center w-[500px] py-2  border-b border-gray-300'>
                            Airbnb Your Home
                        </h1>
                        <h1 className='mx-3 p-2 font-bold'>Add Photos of your place </h1>
                        <h6 className='text-sm  text-gray-400 mx-6'>What amenities do you have? </h6>
                    </div>
                    <ImageUpload />
                    <div className='flex flex-col justify-start items-start '>
                        <div onClick={handleAddDescription}>
                            <Button type={false} title='Next' />
                        </div>
                        <div onClick={() => state.position = 'location'}>
                            <Button type={true} title='Back' />
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    } else if (snap.position === 'description') {
        return (
            <motion.div {...slideAnimation('top')} className={`absolute top-14 z-40 bg-white flex justify-center  w-2/5   my-9 border-[1px] border-gray-400 rounded-xl `}>
                <div className='flex relative  flex-col justify-start items-start w-full'>
                    <AiOutlineClose size={20} onClick={() => setOpenHome(false)} className='absolute mt-2 ml-3 cursor-pointer' />
                    <div className='p-2'>
                        <h1 className='text-xl  font-bold text-center w-[500px] py-2  border-b border-gray-300'>
                            Airbnb Your Home
                        </h1>
                        <h1 className='mx-3 p-2 font-bold'>How would you describe your place? </h1>
                        <h6 className='text-sm  text-gray-400 mx-6'>Short and sweet works best! </h6>
                    </div>
                    <Input id="title" placeholder='Title' type='text' onChange={onChange} />
                    <hr />
                    <Input textArea={true} id="description" placeholder='Description' type='text' onChange={onChange} />
                    <div className='flex flex-col justify-start items-start translate-x-4'>
                        <div onClick={handleAddPrice}>
                            <Button type={false} title='Next' />
                        </div>
                        <div onClick={() => state.position = 'photo'}>
                            <Button type={true} title='Back' />
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    } else if (snap.position === 'price') {
        return (
            <motion.div {...slideAnimation('top')} className={`absolute top-14 z-40  bg-white flex justify-center  w-2/5   my-9 border-[1px] border-gray-400 rounded-xl `}>
                <div className='flex relative  flex-col justify-start items-start w-full'>
                    <AiOutlineClose size={20} onClick={() => setOpenHome(false)} className='absolute mt-2 ml-3 cursor-pointer' />
                    <div className='p-2'>
                        <h1 className='text-xl  font-bold text-center w-[500px] py-2  border-b border-gray-300'>
                            Airbnb Your Home
                        </h1>
                        <h1 className='mx-3 p-2 font-bold'>Now, set your price </h1>
                        <h6 className='text-sm  text-gray-400 mx-6'>how much do you charge per night? </h6>
                    </div>
                    <Input id="price" placeholder='Price' type='number' onChange={onChangePrice} />
                    <div className='flex flex-col justify-start items-start translate-x-4'>
                        <div onClick={() => { addHome() }}>
                            <Button type={false} title='Next' />
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
                        <div onClick={() => state.position = 'photo'}>
                            <Button type={true} title='Back' />
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }
}

export default RentModal