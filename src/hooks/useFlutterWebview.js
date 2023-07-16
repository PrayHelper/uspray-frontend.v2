import { useRef } from 'react';
import { useEffect } from 'react';
import useSleep from './useSleep';


const nil = {isnil: true}


const useDeviceToken = () => {

  const { sleepWithCondition, sleep } = useSleep();

  const muLock = useRef(false);
  const deviceToken = useRef(null);

  const getDeviceToken = async () => {
    if (deviceToken.current != null) {
      return deviceToken.current
    }
    //eslint-disable-next-line
    FlutterGetDeviceToken.postMessage(nil);

    muLock.current = true;
    //sleepWithCondition(() => muLock.current === false)
    sleep(1000)

    alert(`getAuthToken() returned ${deviceToken.current}`)
    return deviceToken.current;
  }

  useEffect(() => {
    window.onReceiveDeviceToken = (token) => {
      deviceToken.current = token
      muLock.current = false;
    }
  }, []);

  return {
    getDeviceToken,
  }
}



const useAuthToken = () => {

  const { sleepWithCondition } = useSleep();

  const muLockGetter = useRef(false);
  const muLockSetter = useRef(false);
  const authToken = useRef(null);

  // Return nullstring if there is no auth token stored in device.
  const getAuthToken = async () => {
    if (authToken.current != null) {
      return authToken.current
    }
    //eslint-disable-next-line
    await FlutterGetAuthToken.postMessage();

    muLockGetter.current = true;
    sleepWithCondition(() => muLockGetter.current === false)

    return authToken.current;
  }

  const storeAuthToken = (token) => {
    authToken.current = token;
    //eslint-disable-next-line
    FlutterStoreAuthToken.postMessage(token);
  }

  
  useEffect(() => {
    window.onReceiveAuthToken = (token) => {
      authToken.current = token
      muLockGetter.current = false;

      alert(`onReceiveAuthToken(${token}) called`)
    }

    window.onReceiveTokenStoredMsg = () => {
      muLockSetter.current = false;
    }
  }, []);
  

  return {
    getAuthToken,
    storeAuthToken
  }
}



const useFlutterWebview = () => {

  const isMobile = () => {
    //eslint-disable-next-line
    const isDeviceTokenAvail = typeof FlutterGetDeviceToken !== "undefined" && typeof FlutterGetAuthToken.postMessage === "function"
    //eslint-disable-next-line
    const isGetAuthTokenAvail = typeof FlutterStoreAuthToken !== "undefined" && typeof FlutterStoreAuthToken.postMessage === "function"
    //eslint-disable-next-line
    const isStoreAuthTokenAvail = typeof FlutterStoreAuthToken !== "undefined" && typeof FlutterStoreAuthToken.postMessage === "function"

    if (isDeviceTokenAvail) {
      return true;
    } else {
      return false
    }

  }

  const { getDeviceToken } = useDeviceToken();
  const { getAuthToken, storeAuthToken } = useAuthToken();

  return {
    isMobile,
    getDeviceToken,
    getAuthToken,
    storeAuthToken
  }
}


export default useFlutterWebview;