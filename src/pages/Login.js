import React from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

const Login = () => {
  return (
    <LoginWrapper>
      <LogoWrapper>
        <LogoImg src="images/logo_image.svg" alt="logo" />
        <LogoTitle>Uspray</LogoTitle>
        <LogoSubTitle>너에게 기도를, 유스프레이</LogoSubTitle>
      </LogoWrapper>
      <BottomBtnWrapper>
        <BottomBtn>
          <BottomBtnFont>로그인하기</BottomBtnFont>
          <FaArrowRight color="white" />
        </BottomBtn>
        <BottomBtn>
          <BottomBtnFont>회원가입하기</BottomBtnFont>
          <FaArrowRight color="white" />
        </BottomBtn>
        <BottomBtn2>
          <SubmitInput type="text" placeholder="아이디 입력" />
          <SubmitInputBtn>
            <FaArrowRight color="white" />
          </SubmitInputBtn>
        </BottomBtn2>
      </BottomBtnWrapper>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: gainsboro;
  height: 100vh;
  padding: 0 24px;
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
  padding: 12px 0px;
`;

const BottomBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 63px;
  border-radius: 16px;
  background-color: #7bab6e;
  padding: 0 16px;
  margin-bottom: 12px;
  cursor: pointer;
`;

const BottomBtnFont = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

const BottomBtn2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 1px solid #7bab6e;
  border-radius: 16px;
`;

const SubmitInput = styled.input`
  width: 100%;
  border: none;
  background: none;
  font-size: 16px;
  color: #7bab6e;
  ::-webkit-input-placeholder {
    color: #7bab6e;
  }
  padding: 0px 16px;
`;

const SubmitInputBtn = styled.div`
  background: #7bab6e;
  border-radius: 0px 16px 16px 0px;
  height: 100%;
  padding: 20px 28px;
  cursor: pointer;
`;
