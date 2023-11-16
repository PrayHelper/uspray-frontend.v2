import { useRef } from 'react';
import { useEffect } from 'react';
import useSleep from './useSleep';


const nil = {isnil: true}

let deviceToken = {
    current: ""
}

let authToken = {
    current: ""
}

let deviceLock = {
    current: false
}

let authLock = {
    current: false
}


const useDeviceToken = () => {

  const { sleepWithCondition } = useSleep();

  const getDeviceToken = async () => {
    if (deviceToken.current !== "") {
      return deviceToken.current
    }

    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutHandle = setTimeout(() => reject(new Error('Timeout error')), 1000);
    });

    //eslint-disable-next-line
    FlutterGetDeviceToken.postMessage(nil);
    deviceLock.current = true;

    try {
        await Promise.race([
            await sleepWithCondition(() => deviceLock.current === false),
            timeoutPromise
        ]);
        clearTimeout(timeoutHandle);

        console.log(`getDeviceToken() returned ${deviceToken.current}`)
        return deviceToken.current;
    } catch (error) {
        throw error;
    }
  }

  useEffect(() => {
    // name should be modified to onReceiveDeviceToken
    window.onReceiveDeviceToken = (token) => {
      deviceToken.current = token
      deviceLock.current = false;

      console.log(`onReceiveDeviceToken(${token}) called`)
    }
  }, []);

  return {
    getDeviceToken,
  }
}



const useAuthToken = () => {

  const { sleepWithCondition } = useSleep();

  // Return nullstring if there is no auth token stored in device.
  const getAuthToken = async () => {
    if (authToken.current !== "") {
      return authToken.current
    }

    let timeoutHandle;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutHandle = setTimeout(() => reject(new Error('Timeout error')), 1000);
    });

    //eslint-disable-next-line
    FlutterGetAuthToken.postMessage(nil);
    authLock.current = true;

    try {
        await Promise.race([
            await sleepWithCondition(() => authLock.current === false),
            timeoutPromise
        ]);
        clearTimeout(timeoutHandle);

        console.log(`getAuthToken() returned ${authToken.current ? authToken.current : "null"}`)
        return authToken.current;

    } catch(error) {
        throw error;
    }
  }

  const storeAuthToken = (token) => {
    authToken.current = token;
    //eslint-disable-next-line
    FlutterStoreAuthToken.postMessage(token);
  }

  
  useEffect(() => {
    window.onReceiveAuthToken = (token) => {
      authToken.current = token
      authLock.current = false;

      console.log(`onReceiveAuthToken(${token}) called`)
    }

    window.onReceiveTokenStoredAck = () => {
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
        const data = JSON.stringify({title, url})
        //eslint-disable-next-line
        FlutterShareLink.postMessage(data);
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