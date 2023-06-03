import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { putFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const putChangeValue = async (accessToken, id, data) => {
  return await putFetcher(`/pray/my/${id}`, data ,{
    Authorization: accessToken,
  });
};

export const useChangeValue = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation(({id, data}) => {
    return putChangeValue(accessToken, id, data)}, {
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