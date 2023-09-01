import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/auth";
import { postFetcher, refresh } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

const updateSharedList = async (getAccessToken, data) => {
  return await postFetcher("/share/save", data, {
    Authorization: getAccessToken(),
  });
};

export const useUpdateSharedList = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();
  return useMutation(
    (data) => {
      return updateSharedList(getAccessToken, data);
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
