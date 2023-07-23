import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { deleteDataFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const deleteSharedList = async (accessToken, data) => {
  return await deleteDataFetcher("/share", data, {
    Authorization: accessToken,
  });
};

export const useDeleteSharedList = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation(
    (data) => {
      return deleteSharedList(accessToken, data);
    },
    {
      onError: (e) => {
        console.log(accessToken);
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
