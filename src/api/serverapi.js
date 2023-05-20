import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../recoil/accessToken";

const Refresh = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  const api = "/user/token";
  try {
    const res = await serverapi.get(api, {
      headers: {
        Authorization: `${refreshToken}`,
      }
    });
    console.log(res);
    if (res.status === 200) {
      console.log(res);
    }
  } catch (e) {
    console.log(e);
  }

};

// ErrorInterceptor
const onErrorResponse = (error) => {
  if (axios.isAxiosError(error)) {
    const { status } = error.response;

    switch (status) {
      case 401: {
        console.log("refresh token is expired");
        break;
      }
      case 403: {
        Refresh();
        console.log("access token is expired");
        break;
      }
      case 404: {
        console.log("잘못된 요청입니다.");
        break;
      }
      case 500: {
        console.log("서버에 문제가 발생했습니다.");
        break;
      }
      default: {
        // console.log(status);

        console.log("알 수 없는 오류가 발생했습니다.");
        break;
      }
    }
  } else {

  }
  return Promise.reject(error);
};

const setupInterceptors = (instance) => {
  instance.interceptors.response.use(function (response) {
    return response.data.data;
  },
   onErrorResponse);

  return instance;
};


const baseURL = process.env.REACT_APP_API_ORIGIN + process.env.REACT_APP_API_DEFAULT_PREFIX
const instance = axios.create();

instance.defaults.baseURL = baseURL

const serverapi = setupInterceptors(instance);

export default serverapi;