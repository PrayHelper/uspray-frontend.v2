import { postFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const postShareItem = async (getAccessToken, data) => {
    return await postFetcher('/share', data, {
      Authorization: getAccessToken(),
    });
  };
  

export const useShare = () =>{
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation(
    (data) => {
    return postShareItem(getAccessToken, data)}, {
    onError: async (e) => {
      if (e.status === 500) {
        await refresh();
      }
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