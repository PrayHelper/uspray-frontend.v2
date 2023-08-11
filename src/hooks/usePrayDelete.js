import { deleteFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";


const deletePrayItem = async (getAccessToken, id) => {
  return await deleteFetcher(`/pray/${id}`, {
    Authorization: getAccessToken(),
  });
};

export const usePrayDelete = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation((data) => {
    return deletePrayItem(getAccessToken, data.id)
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