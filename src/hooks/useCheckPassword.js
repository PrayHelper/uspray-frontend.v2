import { postFetcher, refresh } from "./api";
import { useMutation } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";

const postCheckPassword = async (data, accessToken) => {
  return await postFetcher('/user/check/pw', data, {
    Authorization: accessToken,
  });
};

export const useCheckPassword = (data) => {
  const accessToken = useRecoilValue(tokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  return useMutation(() => {
    return postCheckPassword(data, accessToken)}, {
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
};
