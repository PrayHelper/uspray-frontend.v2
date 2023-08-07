import { putFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const putNotifyDisable = async (data, getAccessToken) => {
  return await putFetcher("/user/notification/" + data + "/disable", data, {
    Authorization: getAccessToken(),
  });
};

export const useNotificationDisable = (data) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();

  return useMutation(
    () => {
      return putNotifyDisable(data.id, getAccessToken);
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
