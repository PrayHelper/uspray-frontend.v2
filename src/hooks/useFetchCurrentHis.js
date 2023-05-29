import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { getFetcher, refresh } from "./api";
import { useMutation, useQuery } from "react-query";

const getCurrentHis = async (accessToken) => {
  return await getFetcher('/history', {
    Authorization: accessToken,
  });
};

export const useFetchCurrentHis = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useQuery(["currentHistory"], () => {
    return getCurrentHis(accessToken)}, {
      onError: (e) => {
        if (e.status === 403) {
          const data = refresh();
          if (typeof(data) === "string")
            setAccessToken(data);
        }
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
      },
      retry: (cnt) => {
        return cnt < 1;
      },
      retryDelay: 300,
    });
}