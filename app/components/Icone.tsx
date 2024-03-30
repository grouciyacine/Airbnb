import React, { useCallback, useState } from 'react'
import { IconType } from 'react-icons'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string';

type Props = {
    title: string;
    Icon: IconType;
    desc: string;
    selected: boolean
}

function Icone({ title, Icon, desc, selected }: Props) {
    const router = useRouter()
    const params = useSearchParams()
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
        <div onClick={handleClick} className={`${selected ? 'border-b-[2px] border-black text-black' : 'transition-all text-gray-600  hover:text-black hover:border-b-[2px] border-gray-300    '} flex   flex-col items-center space-x-3 mx-3 justify-center cursor-pointer   `}>
            <Icon className=' ' size={24} />
            <h4>{title}</h4>
        </div>
    )

}
export default Icone