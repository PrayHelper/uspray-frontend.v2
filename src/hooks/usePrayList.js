import { useQuery } from 'react-query';
import { useRecoilState } from "recoil";
import { getFetcher, refresh } from "./api";
import { tokenState } from "../recoil/accessToken";

const getPrayList = async (accessToken,sort_by) => {
  return await getFetcher(`/pray?sort_by=${sort_by}`, {
    Authorization: accessToken,
  });

}

export const usePrayList = (sort_by) => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useQuery(['prayList','sort_by', accessToken],() => {return getPrayList(accessToken,sort_by)} ,  {
    onError: (e) => {
      if (e.status === 403) {
        const data = refresh();
        if (typeof(data) === "string")
          setAccessToken(data);
      }
    },
    onSuccess: (res) => {
      console.log(res);
    },
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  })
}