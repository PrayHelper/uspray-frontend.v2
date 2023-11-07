import useApi from './useApi';
import { useMutation } from "react-query";

const getShareSocial = async (postFetcher, data) => {
  const dataJoin = data.join("%2C")
  return await postFetcher(`/share/social?pray_list=${dataJoin}`);
}

export const useShareSocial = (data) => {
  const { postFetcher } = useApi();
  // return useQuery(["pray_list", data], () => 
  // {return getShareSocial(postFetcher, data)}, {
  //   onError: (e) => {
  //     console.log(e);
  //   },
  //   onSuccess: (res) => {
  //   //   console.log(res);
  //   },
  //   retry: (cnt) => {
  //     return cnt < 3;
  //   },
  //   retryDelay: 300,
  //   refetchOnWindowFocus: false,
  // })
  return useMutation(
    async (data) => {
    return await postFetcher('/share/social', data)}, {
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (res) => {
      console.log(res);
    },
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  });
}