import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoginButton from "../components/Login/LoginButton/LoginButton";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";

import LogoSVG from "../images/logo_image.svg";

const Login = () => {
  return (
    <LoginWrapper>
      <LogoWrapper>
        <LogoImg src={LogoSVG} alt="logo" />
        <LogoTitle>Uspray</LogoTitle>
        <LogoSubTitle>너에게 기도를, 유스프레이</LogoSubTitle>
      </LogoWrapper>
      <BottomBtnWrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "20px 24px",
          }}
        >
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              buttonSize={ButtonSize.LARGE}
              buttonTheme={ButtonTheme.GREEN}
            >
              로그인
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              buttonSize={ButtonSize.LARGE}
              buttonTheme={ButtonTheme.WHITE}
            >
              회원가입
            </Button>
          </Link>
        </div>
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
  padding: 10px 0px;
`;
