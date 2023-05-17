import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginButton from "../components/Login/LoginButton/LoginButton";

const Login = () => {
  return (
    <LoginWrapper>
      <LogoWrapper>
        <LogoImg src="images/logo_image.svg" alt="logo" />
        <LogoTitle>Uspray</LogoTitle>
        <LogoSubTitle>너에게 기도를, 유스프레이</LogoSubTitle>
      </LogoWrapper>
      <BottomBtnWrapper>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <LoginButton
            backgrond={"#7bab6e"}
            context={"로그인하기"}
            color={"#ffffff"}
            arrowColor={"#ffffff"}
            margin={"0px 24px 12px 24px"}
          />
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <LoginButton
            backgrond={"#ffffff"}
            context={"회원가입하기"}
            color={"#7bab6e"}
            borderColor={"#7bab6e"}
            arrowColor={"#7bab6e"}
            margin={"0px 24px 12px 24px"}
          />
        </Link>
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
  padding: 8px 0px;
`;
