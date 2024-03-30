import useSWR from "swr";
import fetcher from "../libs/fetcher";
const useGetUser = (userId: string) => {
    const { data, error, isLoading } = useSWR(userId ? `/api/getUser?id=${userId}` : '', fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
    })
    return { data, error, isLoading }
}
export default useGetUser