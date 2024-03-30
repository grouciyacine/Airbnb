import { title } from 'process'
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import state from '../config/store'

type Props = {
    title: string,
    subtitle: string,
    Snap:string
}

function Counter({ title,Snap,subtitle }: Props) {
    const [value, setValue] = useState(0)
    const snap=useSnapshot(state)
    console.log(Snap)
    const add = useCallback(async() => {
        await setValue(value + 1)
    }, [value])
    const reduce = useCallback(() => {
        if (value > 0) {
            setValue(value - 1)
        }
    }, [value])
    useEffect(()=>{
        switch (Snap){
            case 'guests':state.guestCount=value;break;
            case 'rooms':state.roomCount=value;break;
            case 'bathrooms':state.bathroomCount=value;break;
            case  'Adults':state.Adults=value;break;
            case  'Children':state.Children=value;break;
            case  'Infants':state.Infants=value;break;
            case 'Pets':state.Pets=value;break;
        }
    },[snap,value])
    console.log(snap)
    return (
        <div className='flex  flex-row w-full items-center  justify-between'>
            <div className='flex flex-col m-4 w-2/6'>
                <div className='font-medium w-fit'>
                    {title}
                </div>
                <div className='font-light text-gray-600 '>
                    {subtitle}
                </div>
            </div>
            <div className='flex flex-row  items-center '>
                <div onClick={reduce} className='translate-x-4 w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'>
                    <AiOutlineMinus />
                </div>
            </div>
            <div className='font-light text-xl text-neutral-600'>
                {value}
            </div>
            <div className='flex flex-row  items-center gap-4'>
                <div onClick={add} className='-translate-x-4 w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'>
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    )
}

export default Counter