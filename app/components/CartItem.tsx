import Image from 'next/image'
import React, { useCallback } from 'react'
import { CiHeart } from "react-icons/ci";
import useCurrentUser from '../hooks/useCurrentUser';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";
import Link from 'next/link'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFavorites from '../hooks/favorites';
type Props = {
    data: any
}

function CartItem({ data }: Props) {
    const { data: user, mutate }: any = useCurrentUser()
    const {data:favorites,mutate:MutateFavorite}=useFavorites()
    const handleLikes = useCallback(async () => {
        let response
        if (!user?.others) {
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
                    user?.others?.favoritIds?.includes(data?.id) ? response = await axios.patch(`/api/Dislike?id=${data.id}&userID=${user.others.id}`) :
            response = await axios.post(`/api/Like?id=${data.id}&userID=${user.others.id}`)
        let favoritIds = response.data.favoritIds
        mutate({
            ...user,
            favoritIds: favoritIds
        })
        MutateFavorite()
        }

    }, [data?.id, user?.others?.favoritIds,favorites])
    return (
        <div className=' '>
            <div className='group w-fit h-fit '>
                <div className='p-4 m-4 aspect-square relative overflow-hidden h-48 w-80 md:w-72 lg:w-64 rounded-2xl cursor-pointer'>
                    <Link href={`/home/${data.id}`}>
                        <Image src={data.imagesrc} alt='Home' fill className=' transition  object-cover group-hover:scale-110   ' />
                    </Link>
                    {user?.others?.favoritIds?.includes(data.id) ?
                        <div onClick={handleLikes}>
                            <FaHeart className='text-red-500  z-20 absolute top-0 right-0  m-2' size={26} />
                        </div>
                        :
                        <div onClick={handleLikes}>
                            <CiHeart className='text-white  z-20 absolute top-0 right-0  m-2' size={30} />
                        </div>}
                </div>
                <div className='m-4 pl-2'>
                    <h2>{data.title} | {data.locationValue}</h2>
                    <h3 className='text-gray-400'>{data.type}</h3>
                    <h3>$ {data.price} night</h3>
                </div>
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
    )
}

export default CartItem