import useApi from './useApi';
import { useMutation } from "react-query";


export const useShareSocial = (data) => {
  const { postFetcher } = useApi();
  return useMutation(
    async (data) => {
      return await postFetcher('/share/social', data)
    }, {
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