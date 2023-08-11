import { putFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const putCompletePrayList = async (getAccessToken, data) => {
  return await putFetcher('/pray/finish/'+data, data, {
    Authorization: getAccessToken(),
  });
};

export const useCompletePrayList = (data) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();

  return useMutation((data) => {
    return putCompletePrayList(getAccessToken, data.id)}, {
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