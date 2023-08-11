import { putFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const putResetPhoneNumber = async (data, getAccessToken) => {
  return await putFetcher('/user/reset/phone', data, {
    Authorization: getAccessToken()
  });
};

export const useResetPhoneNumber = (data) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation(() => {
    return putResetPhoneNumber(data, getAccessToken)
  }, {
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
      return cnt < 1;
    },
    retryDelay: 300,
  });
}