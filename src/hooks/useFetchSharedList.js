import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { getFetcher, refresh } from "./api";
import { useQuery } from "react-query";

const getSharedList = async (accessToken) => {
  return await getFetcher("/share", {
    Authorization: accessToken,
  });
};

export const useFetchSharedList = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useQuery(
    ["SharedList", accessToken],
    () => {
      return getSharedList(accessToken);
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
