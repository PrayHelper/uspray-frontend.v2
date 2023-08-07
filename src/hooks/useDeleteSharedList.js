import { deleteDataFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const deleteSharedList = async (getAccessToken, data) => {
  return await deleteDataFetcher("/share", data, {
    Authorization: getAccessToken(),
  });
};

export const useDeleteSharedList = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation(
    (data) => {
      return deleteSharedList(getAccessToken, data);
    },
    {
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
    }
  );
};
