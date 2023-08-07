import { postFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const postCheckPassword = async (data, getAccessToken) => {
  return await postFetcher('/user/check/pw', data, {
    Authorization: getAccessToken(),
  });
};

export const useCheckPassword = (data) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation(() => {
    return postCheckPassword(data, getAccessToken)}, {
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
};
