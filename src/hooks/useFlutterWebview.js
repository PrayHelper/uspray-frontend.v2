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
    window.onReceiveAuthToken = (token) => {
      authToken.current = token
      muLockGetter.current = false;

      console.log(`onReceiveAuthToken(${token}) called`)
    }

    window.onReceiveTokenStoredAck = () => {
      muLockSetter.current = false;
      console.log(`onReceiveTokenStoredAck() called`)
    }
  }, []);
  

  return {
    getAuthToken,
    storeAuthToken
  }
}



const useShareLink = () => {
    const shareLink = ({title, url}) => {
        //eslint-disable-next-line
        FlutterStoreAuthToken.postMessage({title, url});
    }

    return {
        shareLink
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
  const { shareLink } = useShareLink();

  return {
    isMobile,
    getDeviceToken,
    getAuthToken,
    storeAuthToken,
    shareLink
  }
}


export default useFlutterWebview;