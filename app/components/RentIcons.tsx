import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string';
import { useSnapshot } from 'valtio';
import state from '../config/store';
type Props = {
    Icone:IconType,
    title:string,
    selected:boolean,
}

function RentIcons({Icone,title,selected}: Props) {
    const router=useRouter();
    const params=useSearchParams()
    const snap=useSnapshot(state)
    /*useEffect(()=>{
        state.type=title
    },[snap.type,title])*/
    const handleClick = useCallback(() => {
        let currentQuery = {}
        if (params) {
            currentQuery =qs.parse(params.toString())
        }
        const updateQuery: any = {
            ...currentQuery,
            category: title
        }
        console.log(currentQuery,updateQuery)
        state.type=updateQuery?.category
        if (params?.get('category') === title) {
            delete updateQuery.category;
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, { skipNull: true });
        router.push(url);
    }, [params,title,router])
  return (
    <div onClick={handleClick} className={`${selected?'border-black':'border-gray-200'}  border-2 rounded-md w-48 p-2 cursor-pointer hover:border-black hover:border-2 transition-all ease-in-out`}>
        <Icone size={24} className=''/>
        <h4>{title}</h4>
    </div>
  )
}

export default RentIcons