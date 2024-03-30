import React from 'react'
import { IconType } from 'react-icons'
type Props = {
    type:boolean,title:string,Icon?:IconType
}

function Button({title,type,Icon}: Props) {

  return (
    <div className={`w-full z-20 flex items-center justify-center lg:-translate-x-1 `}>
      <div className={`my-2  w-11/12  relative cursor-pointer flex flex-row items-center justify-center ${type?'bg-white text-black border-[2px] border-gray-700':'bg-rose-600 text-white'}  rounded-md`}>
            {Icon && <Icon size={24} className='absolute left-5'/>}
        <button className={`w-[400px] flex justify-center h-10 items-center `}> {title}</button>
      </div>
    </div>
  )
}

export default Button