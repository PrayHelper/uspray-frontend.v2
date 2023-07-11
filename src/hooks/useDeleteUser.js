import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { deleteFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const deleteUser = async (accessToken) => {
  return await deleteFetcher('/user/withdrawal', {
    Authorization: accessToken,
  });
};

export const useDeleteUser = () => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation((data) => {
    return deleteUser(accessToken)
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