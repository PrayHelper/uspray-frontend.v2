import { useEffect } from 'react';
import { useRecoilSetState } from 'recoil';
import { deviceTokenState, authTokenState } from '../recoil/accessToken';


const useFlutterWebview = () => {

  const deviceTokenSetter = useRecoilSetState(deviceTokenState);
  const authTokenSetter = useRecoilSetState(authTokenState);

  const getDeviceToken = () => window.FlutterUtil.getDeviceToken();
  const getAuthToken = () => window.FlutterUtil.getAuthToken();
  const storeAuthToken = (token) => window.storeAuthToken(token);

  useEffect(() => {
    window.sendDeviceToken = (message) => {
      const token = JSON.parse(message)
      deviceTokenSetter(token);
    }

    window.sendAuthToken = (message) => {
      const token = JSON.parse(message)
      authTokenSetter(token);
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
  getDeviceToken();

  const deviceToken = useRecoilValue(deviceTokenState);
  console.log(deviceToken);
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