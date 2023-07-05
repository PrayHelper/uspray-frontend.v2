import { useRef } from 'react';
import { useEffect } from 'react';


const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const useFlutterWebview = () => {

  const deviceToken = useRef("");
  const authToken = useRef("");

  const isMobile = () => {
    // eslint-disable-next-line no-undef
    const flag = typeof FlutterGetDeviceToken !== 'undefined' && typeof FlutterGetDeviceToken.postMessage === 'function';
    console.log(`isMobile() = ${flag}`)
    return flag
  }

  const getDeviceToken = async () => {

    // eslint-disable-next-line no-undef
    FlutterGetDeviceToken.postMessage(JSON.stringify({}));

    await sleep(1000);

    alert(`getDeviceToken() = ${deviceToken.current}`)
    return deviceToken.current;
  }

  const getAuthToken = async () => {
    // eslint-disable-next-line no-undef
    FlutterGetAuthToken.postMessage(JSON.stringify({}));
  }
  // eslint-disable-next-line no-undef
  const storeAuthToken = (token) => FlutterStoreAuthToken.postMessage(token);


  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.sendDeviceToken = (token) => {
      alert(`sendDeviceToken(${token})`)
      deviceToken.current = token
    }

    // eslint-disable-next-line no-undef
    window.sendAuthToken = (token) => {
      authToken.current = token
    }
  }, []);

  return {
    isMobile,
    getDeviceToken,
    getAuthToken,
    storeAuthToken
  }
}

export default useFlutterWebview;



/* INSERUCTION FOR REACT

const onClick = () => {
  const { getDeviceToken } = useFlutterWebview();
  token = getDeviceToken();
  // send token to server
}
*/



/* INSTRUCTION FOR FLUTTER

  javascriptChannels: <JavascriptChannel>[
    JavascriptChannel(
      name: 'FlutterGetDeviceToken',
      onMessageReceived: (JavascriptMessage message) {
        // get device token
        controller.runJavascript('window.sendDeviceToken(${token})');
      },
    ),
    JavascriptChannel(
      name: 'FlutterGetAuthToken',
      onMessageReceived: (JavascriptMessage message) {
        // get auth token
        controller.runJavascript('window.sendAuthToken(${token})');
      },
    ),
    JavascriptChannel(
      name: 'FlutterStoreAuthToken',
      onMessageReceived: (JavascriptMessage message) {
        // store auth token
      },
    ),
  ].toSet(),
*/