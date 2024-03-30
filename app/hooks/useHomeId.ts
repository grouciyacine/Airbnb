import useSWR from 'swr'
import fetcher from '../libs/fetcher' 

const useHomeId=(id:string)=>{
    const {data,error,isLoading}=useSWR(id?`/api/Home?id=${id}`:``,fetcher,{
        revalidateIfStale: true,
        revalidateOnFocus: true, 
        revalidateOnReconnect: true,
    })
    return {data,error,isLoading}
}
export default useHomeId