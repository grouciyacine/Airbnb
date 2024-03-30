import React, { useCallback } from 'react'
import Button from './Button'
import CartItem from './CartItem'
import useHome from '../hooks/useAddHome'
import { useSearchParams } from 'next/navigation'
import homesFilter from '../hooks/filter'


type Props = {}

function Filter({ }: Props) { 
    const { data } = useHome()
    const params:any = useSearchParams()
    const category1 = params?.get('category')
    const { data: filter } = homesFilter(category1 as string)
    const removeParams = useCallback(() => {
        const newParams = new URLSearchParams(params);
        newParams.delete('category');
    
        // Update the URL without triggering a page reload
        //window.history.replaceState({}, '', `${window.location.pathname}${newParams.toString() ? `?${newParams}` : ''}`);
        window.location.href = `${window.location.pathname}${newParams.toString() ? `?${newParams}` : ''}`;
    }, [params,data]);

    if (category1 && !filter) {
        return (
            <div className='flex flex-col items-center justify-center p-24'>
                <h1 className='font-bold text-xl '>No exact matches</h1>
                <h2 className='text-gray-400 '>Try changing or removing somthing in your filters</h2>
                <div className='w-[200px]' onClick={() => { removeParams() }}>
                    <Button title='Remove All Filters' type={true} />
                </div>
            </div>
        )
    } else if (filter) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {filter?.map((data: any, key: number) => (
                    <CartItem key={key} data={data} />
                ))}
            </div>
        )
    }
    else if (data) {
        return (
            <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {data?.map((data: any, key: number) => (
                    <CartItem key={key} data={data} />
                ))}
            </div>
        )
    } if (category1 && !filter) {
        return (
            <div className='flex flex-col items-center justify-center p-24' >
                <h1 className='font-bold text-xl '>No exact matches</h1>
        
                <h2 className='text-gray-400 '>Try changing or removing somthing in your filters</h2>
                <div className='w-[200px] ' >
                    <Button title='Remove All Filters' type={true} />
                </div>
            </div>
        )
    }

}

export default Filter