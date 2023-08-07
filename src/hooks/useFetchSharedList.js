import { getFetcher } from "./api";
import { useQuery } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const getSharedList = async (getAccessToken) => {
  return await getFetcher("/share", {
    Authorization: getAccessToken(),
  });
};

export const useFetchSharedList = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useQuery(
    ["SharedList"],
    () => {
      return getSharedList(getAccessToken);
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
