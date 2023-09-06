import styled from 'styled-components';
import useAuthToken from '../hooks/useAuthToken';
import { useRecoilState } from 'recoil';
import useRefresh from '../hooks/useRefresh';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthorized from '../hooks/useAuthorized';

const SplashScreen = ({url}) => {

  const { getRefreshToken } = useAuthToken();
  const { refresh } = useRefresh();
  const {setAutorized, setUnAuthorized} = useAuthorized()
  const navigate = useNavigate()

  //const location = useLocation();
  //const query = new URLSearchParams(location.search);
  //const url = query.get('redirect')

  console.log(`splash screen url: ${url}`)
  useEffect(() => {

    const run = async () => {

      const refreshToken = await getRefreshToken()
 
      if (refreshToken == undefined || refreshToken == "") {
        setUnAuthorized()

        console.log("refreshToken is nil, go to login page")
        navigate("/")

        return
      }
  
      try {
        await refresh()
        console.log("refresh is called. if error is not occured, login is successed")
        setAutorized()

        (url === "/") ? navigate("/main") : navigate(`${url}`)

      } catch {
        console.log("failed to refresh token, go to login page")
        setUnAuthorized()

        navigate("/")
      }
    }
    run()

  }, [])



  return (
    <BackgroundStyle>
      <img src="images/logo_white.svg" alt="logo_white" />
    </BackgroundStyle>
  );
};

const BackgroundStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;  

  /* 전체적인 배경색 조합 */
  background: linear-gradient(167.98deg, rgba(0, 163, 255, 0) 0%, rgba(0, 163, 255, 0.4) 100%),
              linear-gradient(135deg, #D6FFCB 0.01%, #75BD62 100%);
`;



export default SplashScreen;
