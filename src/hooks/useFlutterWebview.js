import { useEffect } from 'react';


const useFlutterWebview = () => {

  const getDeviceToken = () => window.FlutterUtil.getDeviceToken();
  const getAuthToken = () => window.FlutterUtil.getAuthToken();
  const storeAuthToken = (token) => window.storeAuthToken(token);

  useEffect(() => {
    window.sendDeviceToken = (message) => {
      const token = JSON.parse(message)
      return token
    }

    window.sendAuthToken = (message) => {
      const token = JSON.parse(message)
      return token
    }
  });

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
}
*/



/* INSTRUCTION FOR FLUTTER

class FlutterUtil = {
  function getDeviceToken() {
    // get a device token from mobile
    window.sendDeviceToken(token)
  }
}
*/