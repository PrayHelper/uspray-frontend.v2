import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { postFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const updateSharedList = async (accessToken, data) => {
  return await postFetcher("/share/save", data, {
    Authorization: accessToken,
  });
};

export const useUpdateSharedList = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation(
    (data) => {
      return updateSharedList(accessToken, data);
    },
    {
      onError: (e) => {
        if (e.status === 403) {
          const data = refresh();
          if (typeof data === "string") setAccessToken(data);
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
