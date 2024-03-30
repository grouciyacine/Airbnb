import fetcher from "../libs/fetcher";
import useSWR from 'swr'
const useFavorites = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/favorites', fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true, 
        revalidateOnReconnect: true,
    })
    return { data, error, isLoading, mutate }
}
export default useFavorites
