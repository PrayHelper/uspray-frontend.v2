import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { deleteFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const deletePrayItem = async (accessToken, id) => {
  return await deleteFetcher(`/pray/${id}`, {
    Authorization: accessToken,
  });
};

export const usePrayDelete = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation((id) => {
    return deletePrayItem(accessToken, id)
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
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  });
}