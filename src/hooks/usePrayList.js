import { useQuery } from 'react-query';
import { getFetcher } from "./api";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const getPrayList = async (getAccessToken,sort_by) => {
  const access = getAccessToken()
  console.log(access)
  return await getFetcher(`/pray?sort_by=${sort_by}`, {
    Authorization: access,
  });

}

export const usePrayList = (sort_by) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useQuery(['prayList','sort_by'],() => {return getPrayList(getAccessToken,sort_by)} ,  {
    onError: async (e) => {
      if (e.status === 403) {
       await refresh();
      }
    },
    onSuccess: (res) => {
      console.log(res);
    },
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  })
}