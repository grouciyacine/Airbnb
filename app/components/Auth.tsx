'use client'
import { motion } from 'framer-motion'
import React, { useCallback, useEffect } from 'react'
import Input from './Input'
import Button from './Button'
import { slideAnimation } from '../config/motion'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useCurrentUser from '../hooks/useCurrentUser'
type Props = {
    setOpenAuth: any
}
function Auth({ setOpenAuth }: Props) {
    const { data: user } = useCurrentUser()
    const [auth, setAuth] = useState(false)
    const [data, setData] = useState({
        'email': '', 'name': '', 'password': ''
    })
    const navigate = useRouter()
    const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const Login = useCallback(async () => {
        await signIn('credentials', { email: data.email, password: data.password, callbackUrl: '/' })
        navigate.push('/')
    }, [
        data,navigate
    ])
    const Register = async () => {
        await axios.post('/api/register', { email: data.email, password: data.password, name: data.name }).then((res) => console.log(res)).catch((err) => console.log(err));
        Login()
    }
    console.log(data)
    return (
        <motion.div {...slideAnimation('top')} className={`absolute top-14 z-50 bg-white flex justify-center w-3/4 lg:w-2/5 ${!auth ? 'h-[500px]' : 'h-[450px]'}  my-9 border-[1px] border-gray-400 rounded-xl `}>
            {auth ?
                <div className='flex flex-col justify-start items-start w-full'>
                    <AiOutlineClose size={20} onClick={() => setOpenAuth(false)} className='absolute mt-2 ml-3 cursor-pointer' />
                    <h1 className='text-xl font-bold text-center  py-2 w-full border-b border-gray-300'>
                        Log in
                    </h1>
                    <Input id='email' placeholder='Email' type='email' onChange={handleData} />
                    <Input id='password' placeholder='Password' type='password' onChange={handleData} />
                    <div className='w-full ' onClick={Login}>
                        <Button type={false} title='continue' />
                    </div>

                    <div className='flex flex-row justify-center items-center py-5 '>
                        <div className='w-[230px] h-[1px] bg-gray-300 ml-4' />
                        <h5>or</h5>
                        <div className='w-[240px] h-[1px] bg-gray-300' />
                    </div>
                    <div onClick={() => { signIn('google') }} className='w-full'>
                        <Button type={true} title='Continue with Google' Icon={FcGoogle} />
                    </div>
                    <div onClick={() => { signIn('github') }} className='w-full'>
                        <Button type={true} title='Continue with Github' Icon={BsGithub} />
                    </div>
                    <h2 className='mx-6 text-base'>you have account? <span onClick={() => setAuth(!auth)} className='font-bold border-b-[1px] cursor-pointer border-black'>Sign up</span> </h2>
                </div> :
                <div className='flex flex-col  justify-start items-start w-full'>
                    <AiOutlineClose size={20} className='absolute mt-2 ml-3 cursor-pointer' onClick={() => setOpenAuth(false)} />
                    <h1 className='text-xl font-bold text-center  py-2 w-full border-b border-gray-300'>
                        Sign up
                    </h1>
                    <Input id='name' placeholder='Full Name' type='text' onChange={handleData} />
                    <Input id='email' placeholder='Email' type='email' onChange={handleData} />
                    <Input id='password' placeholder='Password' type='password' onChange={handleData} />
                    <div onClick={Register} className=' w-full'>
                        <Button type={false} title='continue' />
                    </div>

                    <div className='flex flex-row w-full justify-center items-center py-5 '>
                        <div className='w-full h-[1px] bg-gray-300 ' />
                        <h5 className='mx-1 '>or</h5>
                        <div className='w-full h-[1px] bg-gray-300' />
                    </div>
                    <div className='w-full' onClick={() => { signIn('google') }}>
                        <Button type={true} title='Continue with Google' Icon={FcGoogle} />
                    </div>
                    <div className='w-full' onClick={() => { signIn('github', { callbackUrl: '/' }) }}>
                        <Button type={true} title='Continue with Github' Icon={BsGithub} />
                    </div>
                    <h2 className='mx-6 text-sm'>Don&apos;t have account? <span onClick={() => setAuth(!auth)} className='font-bold border-b-[1px] cursor-pointer border-black'>Sign up</span> </h2>
                </div>

            }


        </motion.div>
    )
}

export default Auth