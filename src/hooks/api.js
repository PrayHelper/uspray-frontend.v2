import { useRecoilValue, useSetRecoilState } from "recoil";
import serverapi from "../api/serverapi";
import { tokenState } from "../recoil/accessToken";

// get 방식의 axios 호출 및 error handling
export const useGetFetcher = async (url, onSuccess) => {
  const accessToken = useRecoilValue(tokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  try {
    const res = await serverapi.get(url, {
      headers: {
        Authorization: `${accessToken}`,
      }
    });
    if (onSuccess)
      onSuccess();
  } catch (e) {
    // 403 : access toekn 만료
    if (e.status === 403) {
      const data = refresh();
      if (typeof(data) === "string")
        setAccessToken(data);
    }
    console.log(e);
  }
};

// post 방식의 axios 호출 및 error handling
export const usePostFetcher = async (url, data, onSuccess) => {
  const accessToken = useRecoilValue(tokenState);
  const setAccessToken = useSetRecoilState(tokenState);
  try {
    const res = await serverapi.post(url, data, {
      headers: {
        Authorization: `${accessToken}`,
      }
    });
    if (onSuccess)
      onSuccess();
  } catch (e) {
    // 403 : access toekn 만료
    if (e.status === 403) {
      const data = refresh();
      if (typeof(data) === "string")
        setAccessToken(data);
    }
    console.log(e);
  }
};

// accessToken 재발급을 위한 axios 호출
const refresh = async (status) => {
  
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await serverapi.get('/user/token', {
      headers: {
        Authorization: `${refreshToken}`,
      }
    });
    return (res.data.access_token);

  } catch (e) {
    // 401 : refresh token 만료
    if (e.status === 401) {
      localStorage.setItem('refreshToken', '');
      window.location.href('/');
    }
    return (e);
  }
};