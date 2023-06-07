import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { putFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const putCompletePrayList = async (accessToken, data) => {
  return await putFetcher('/pray/finish/'+data, data, {
    Authorization: accessToken,
  });
};

export const useCompletePrayList = (data) => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation((data) => {
    return putCompletePrayList(accessToken, data.id)}, {
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
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    });
}