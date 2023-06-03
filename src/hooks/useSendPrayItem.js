import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { postFetcher, refresh } from "./api";
import { useMutation } from "react-query";


const postPrayItem = async (accessToken, data) => {
  return await postFetcher('/pray', data, {
    Authorization: accessToken,
  });
};

export const useSendPrayItem = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation((data) => {
    return postPrayItem(accessToken, data)}, {
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
