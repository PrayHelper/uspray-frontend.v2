import { putFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";


const putChangeValue = async (getAccessToken, id, data) => {
  return await putFetcher(`/pray/my/${id}`, data ,{
    Authorization: getAccessToken(),
  });
};

export const useChangeValue = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();

  return useMutation(({id, data}) => {
    return putChangeValue(getAccessToken, id, data)}, {
      onError: async (e) => {
        if (e.status === 403) {
          await refresh();
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