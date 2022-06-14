// make a stream on the server side!!
// react hook for data fetching
import useSWR from 'swr'
import fetcher from './fetcher'


export const useStream = () => {
  const { data, error } = useSWR('/user-token', fetcher)

return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
   
}