import useSWR from "swr";
import fetcher from "../libs/fetcher";
const useCurrentUser=()=>{
    const {data,error,isLoading,mutate}=useSWR('/api/session',fetcher,{
        revalidateIfStale: true, // Enable revalidation when the data is stale
        revalidateOnFocus: true, // Enable revalidation when the page gains focus
        revalidateOnReconnect: true, // Enable revalidation when the connection is re-established
        //refreshInterval: 30000, // Set a time interval (in milliseconds) for automatic revalidation (e.g., every 30 seconds)
      })
    return {data,error,isLoading,mutate}
}
export default useCurrentUser

