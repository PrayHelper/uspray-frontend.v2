import { useRef } from "react";
import useFlutterWebview from "./useFlutterWebview"
import { useEffect } from "react";
import useSleep from "./useSleep";




const useAuthToken = () => {

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

  const getAuthToken = () => {
    if (isMobile()) {
      return getAuthTokenFromMobile();
    } else {
      return getAuthTokenFromLocalStorage();
    }
  }

  const setAuthToken = (token) => {
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
    getAuthToken,
    setAuthToken,
  }

}

export default useAuthToken;