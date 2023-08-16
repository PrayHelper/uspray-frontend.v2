import { useQuery } from 'react-query';
import { getFetcher } from "./api";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const getInfo = async (getAccessToken) => {
  return await getFetcher(`/user/info`, {
    Authorization: getAccessToken(),
  });

}

export const useGetInfo = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useQuery([], () => {return getInfo(getAccessToken)} ,  {
    onError: async (e) => {
      if (e.status === 403) {
       await refresh();
      }
    },
    onSuccess: (res) => {
    //   console.log(res);
    },
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  })
}