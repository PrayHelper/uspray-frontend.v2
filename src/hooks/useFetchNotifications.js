import { getFetcher } from "./api";
import { useQuery } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const getNotifyInfo = async (accessToken, params) => {
  return await getFetcher(
    "/user/notifications",
    {
      Authorization: accessToken(),
    },
    params
  );
};

export const useFetchNotifications = (params) => {
  const { accessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useQuery(
    ["FetchNotifications", params],
    () => {
      return getNotifyInfo(accessToken, params);
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
