import { deleteFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const deleteUser = async (getAccessToken) => {
  return await deleteFetcher('/user/withdrawal', {
    Authorization: getAccessToken(),
  });
};

export const useDeleteUser = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation((data) => {
    return deleteUser(getAccessToken)
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
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  });
}