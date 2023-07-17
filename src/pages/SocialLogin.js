import styled from "styled-components";
import SocialLoginBtn from "../components/SocialLoginBtn/SocialLoginBtn";

const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
`;

const LogoWrapper = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 204px;
`;

const LogoTitle = styled.div`
  color: #75bd62;
  font-size: 40px;
  font-weight: 700;
  line-height: 57.92px;
`;

const LogoSubTitle = styled.div`
  color: #75bd62;
  font-size: 24px;
  line-height: 34.75px;
`;

const BottomBtnWrapper = styled.div`
  width: 100%;
  padding: 20px 0px;
`;

const SocialLogin = () => {
  return (
    <SocialLoginWrapper>
      <LogoWrapper>
        <LogoImg src="images/logo_image.svg" alt="logo" />
        <LogoTitle>Uspray</LogoTitle>
        <LogoSubTitle>너에게 기도를, 유스프레이</LogoSubTitle>
      </LogoWrapper>
      <BottomBtnWrapper>
        <SocialLoginBtn theme={"kakao"}>카카오로 계속하기</SocialLoginBtn>
        <SocialLoginBtn theme={"naver"}>네이버로 계속하기</SocialLoginBtn>
        <SocialLoginBtn theme={"apple"}>Apple로 계속하기</SocialLoginBtn>
      </BottomBtnWrapper>
    </SocialLoginWrapper>
  );
};

export default SocialLogin;
