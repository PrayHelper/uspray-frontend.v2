import styled from "styled-components";
import SocialLoginBtn from "../components/SocialLoginBtn";
import { useState } from "react";
import { useEffect } from "react";

import LogoSVG from "../images/logo_image.svg";

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

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  margin-bottom: 40px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: center;

  & > a {
    text-decoration: none;
    color: #a0a0a0;
    font-size: 12px;
    font-weight: 700;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const IconWrapper = styled.img`
  position: absolute;
  left: 20px;
`;

const Bar = styled.span`
  width: 1px;
  height: 12px;
  background-color: #cecece;
`;

const SocialLogin = () => {
  const {
    REACT_APP_KAKAO_API_KEY,
    REACT_APP_KAKAO_CLIENT_SECRET,
    REACT_APP_KAKAO_URI,
  } = process.env;

  useEffect(() => {
    console.log(
      "REACT_APP_KAKAO_API_KEY: ",
      process.env.REACT_APP_KAKAO_API_KEY
    );
    console.log(
      "REACT_APP_KAKAO_CLIENT_SECRET: ",
      process.env.REACT_APP_KAKAO_CLIENT_SECRET
    );
  }, [process.env]);

  const kakaoReq = async () => {
    await fetch(
      `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_API_KEY}&redirect_uri=${REACT_APP_KAKAO_URI}&response_type=code`,
      {
        header: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }
    );
  };

  return (
    <SocialLoginWrapper>
      <LogoWrapper>
        <LogoImg src={LogoSVG} alt="logo" />
        <LogoTitle>Uspray</LogoTitle>
        <LogoSubTitle>너에게 기도를, 유스프레이</LogoSubTitle>
      </LogoWrapper>
      <BottomWrapper>
        <BtnWrapper>
          <SocialLoginBtn onClick={kakaoReq} theme={"kakao"}>
            <IconWrapper src="images/ic_kakao.svg" />
            카카오로 계속하기
          </SocialLoginBtn>
          <SocialLoginBtn theme={"naver"}>
            <IconWrapper src="images/ic_naver.svg" />
            네이버로 계속하기
          </SocialLoginBtn>
          <SocialLoginBtn theme={"apple"}>
            <IconWrapper src="images/ic_apple.svg" />
            Apple로 계속하기
          </SocialLoginBtn>
        </BtnWrapper>
        <LinksWrapper>
          <a>회원가입하기</a>
          <Bar />
          <a>로그인하기</a>
          <Bar />
          <a>문의하기</a>
        </LinksWrapper>
      </BottomWrapper>
    </SocialLoginWrapper>
  );
};

export default SocialLogin;
