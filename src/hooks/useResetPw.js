import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { putFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const putResetPw = async (data, accessToken) => {
  return await putFetcher('/user/reset/password', data, {
    Authorization: accessToken
  });
};

export const useResetPw = (data) => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation(() => {
    return putResetPw(data, accessToken)
  }, {
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