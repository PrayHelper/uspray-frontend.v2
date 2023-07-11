import { useRef } from 'react';
import { useEffect } from 'react';


const useFlutterWebview = () => {

  const deviceToken = useRef(null);
  const authToken = useRef(null);

  const getDeviceToken = async () => {
    await window.FlutterGetDeviceToken.postMessage();
    return deviceToken.current;
  }

  const getAuthToken = async () => {
    await window.FlutterGetAuthToken.getAuthToken();
    return authToken.current;
  }

  const storeAuthToken = async (token) => await window.FlutterStoreAuthToken.postMessage(token);


  useEffect(() => {
    window.sendDeviceToken = (token) => {
      deviceToken.current = token
    }

    window.sendAuthToken = (token) => {
      authToken.current = token
    }
  }, []);

  return {
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