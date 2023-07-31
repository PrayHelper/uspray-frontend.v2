import { putFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const putHistory = async (getAccessToken, data) => {
  return await putFetcher('/history/modify', data, {
    Authorization: getAccessToken(),
  });
};

export const useHistoryModify = (data) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation(() => {
    return putHistory(getAccessToken, data)}, {
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