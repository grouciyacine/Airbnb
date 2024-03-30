import useSWR from "swr";
import fetcher from "../libs/fetcher";
const useLike = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/Like', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
    return { data, error, isLoading, mutate}
}
export default useLike
