import { useQuery } from 'react-query';
import { getFetcher } from "./api";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const getShareSocial = async (getAccessToken, data) => {
    const dataJoin = data.join("%2C")
  return await getFetcher(`/share/social?pray_list=${dataJoin}`, {
    Authorization: getAccessToken(), 
  });

}

export const useShareSocial = (data) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useQuery(["pray_list", data], () => 
  {return getShareSocial(getAccessToken, data)} ,  {
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