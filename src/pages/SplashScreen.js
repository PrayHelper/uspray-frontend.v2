import styled from 'styled-components';

const SplashScreen = () => {

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
