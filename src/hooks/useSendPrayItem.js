import { postFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";


const postPrayItem = async (getAccessToken, data) => {
  return await postFetcher('/pray', data, {
    Authorization: getAccessToken(),
  });
};

export const useSendPrayItem = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation((data) => {
    return postPrayItem(getAccessToken, data)}, {
    onError: async (e) => {
      if (e.status === 403) {
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
