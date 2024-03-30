import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { useCallback } from 'react'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'
import { useSnapshot } from 'valtio'
import state from '../config/store'
type Props = {

}

function ImageUpload({ }: Props) {
    const snap = useSnapshot(state)
    const handleImages = useCallback((result: any) => {
        state.image=result.info.secure_url
    }, [state])

    return (
        <CldUploadWidget
        onUpload={handleImages}
        uploadPreset='hxkgnhpn'
        options={{
            maxFiles:1
        }}>
            {({open})=>{
                return(
                    <div
                    className='w-96 translate-x-16 relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'
                    onClick={()=>open?.()}>
                        <TbPhotoPlus size={50}/>
                        <div className='font-semibold text-lg '>
                            Click To Upload
                        </div>
                        {snap.image && (
                            <Image
                            alt='Upload'
                            fill
                            style={{objectFit:'cover'}}
                            src={snap.image}/>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload