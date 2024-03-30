import React from 'react'

type Props = {
    id:string,placeholder:string,type:string,onChange?:any,textArea?:boolean
}

function Input({id,placeholder,type,onChange,textArea }: Props) {
    if(type==="number"){
        return (
            <div className='w-full relative '>
                <span className='text-xl font-bold right-20 z-40 top-4 absolute text-black'>$</span>
                <input type={type} placeholder='' onChange={onChange} id={id} name={id} className=' w-[460px] peer mx-6 rounded-md p-2 h-11 outline-none border-[2px]  border-rose-400 my-2' />
                <span className='left-0 translate-x-8 text-start absolute text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3'>{placeholder}</span>
            </div>
        )
    }else{
            return (
        <div className='lg:-translate-x-2 w-full flex items-center justify-center relative'>
            {textArea? <textarea  placeholder='' onChange={onChange} id={id} cols={5} name={id} className=' w-full   peer mx-6 rounded-md p-2 h-28 outline-none border-[2px]  border-rose-400 my-2' />:
            <input type={type} placeholder='' onChange={onChange} id={id} name={id} className='w-11/12 lg:w-[460px] peer  rounded-md  p-5 h-11 outline-none border-[2px]  border-rose-400 my-2' /> }
            
            <span className='left-0 translate-x-8 text-start absolute text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3'>{placeholder}</span>
        </div>
    )
    }

}

export default Input