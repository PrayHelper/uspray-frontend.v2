import { useRef } from "react";
import useFlutterWebview from "./useFlutterWebview"
import { useEffect } from "react";
import useSleep from "./useSleep";




const useAuthToken = () => {

  const accessToken = useRef(null);

  const getAccessToken = () => {
    return accessToken.current;
  }

  const setAccessToken = (token) => {
    accessToken.current = token;
  }


  const muLock = useRef(false);
  const { sleepWithCondition } = useSleep();


  const getAuthTokenFromLocalStorage = async () => {
    await sleepWithCondition(() => muLock.current === false)
    return localStorage.getItem('authToken');
  }

  const storeAuthTokenToLocalStorage = (token) => {
    localStorage.setItem('authToken', token);
  }

  const {
    isMobile,
    getAuthToken: getAuthTokenFromMobile,
    storeAuthToken: storeAuthTokenFromMobile
  } = useFlutterWebview();

  const getRefreshToken = () => {
    if (isMobile()) {
      return getAuthTokenFromMobile();
    } else {
      return getAuthTokenFromLocalStorage();
    }
  }

  const setRefreshToken = (token) => {
    if (isMobile()) {
      muLock.current = true;
      storeAuthTokenFromMobile(token);
    } else {
      storeAuthTokenToLocalStorage(token);
    }
  }

  useEffect(() => {
    window.alertStoringTokenFinished = () => {
      muLock.current = false;
    }
  }, []);

  return {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
  }

}

export default useAuthToken;