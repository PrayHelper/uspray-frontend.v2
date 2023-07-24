import { useRef } from 'react';
import { useEffect } from 'react';
import useSleep from './useSleep';


const nil = {isnil: true}


const useDeviceToken = () => {

  const { sleepWithCondition } = useSleep();

  const muLock = useRef(false);
  const deviceToken = useRef(null);

  const getDeviceToken = async () => {
    if (deviceToken.current != null) {
      return deviceToken.current
    }
    //eslint-disable-next-line
    FlutterGetDeviceToken.postMessage(nil);

    muLock.current = true;
    await sleepWithCondition(() => muLock.current === false)

    console.log(`getDeviceToken() returned ${deviceToken.current}`)
    return deviceToken.current;
  }

  useEffect(() => {
    // name should be modified to onReceiveDeviceToken
    window.onReceiveDeviceToken = (token) => {
      deviceToken.current = token
      muLock.current = false;

      console.log(`onReceiveDeviceToken(${token}) called`)
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

    console.log(`getAuthToken() returned ${authToken.current}`)
    return authToken.current;
  }

  const storeAuthToken = (token) => {
    authToken.current = token;
    //eslint-disable-next-line
    FlutterStoreAuthToken.postMessage(token);
  }

  
  useEffect(() => {
    window.onReceiveAuthTokenFalse = (token) => {
      authToken.current = token
      muLockGetter.current = false;

      console.log(`onReceiveAuthToken(${token}) called`)
    }

    window.onReceiveTokenStoredMsg = () => {
      muLockSetter.current = false;
      console.log(`onReceiveTokenStoredMsg() called`)
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
    const isDeviceTokenAvail = typeof FlutterGetDeviceToken !== "undefined" && typeof FlutterGetDeviceToken.postMessage === "function"
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