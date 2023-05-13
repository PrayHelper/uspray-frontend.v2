import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "./Button/Button";

const LoginPage = () => {
  const [idValue, setIdValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");

  const onChangeId = (event) => {
    setIdValue(event.target.value);
  };
  const onChangePwd = (event) => {
    setPwdValue(event.target.value);
  };

  return (
    <LoginWrapper>
      <LogoWrapper>
        <LogoImg src="images/logo_image.svg" alt="logo" />
        <LogoTitle>Uspray</LogoTitle>
        <LogoSubTitle>너에게 기도를, 유스프레이</LogoSubTitle>
      </LogoWrapper>
      <BottomBtnWrapper>
        <div style={{ textAlign: "center" }}>
          <div style={{ margin: "0px 24px 12px 24px" }}>
            <Input
              label="아이디"
              value={idValue}
              onChangeHandler={onChangeId}
            />
          </div>
          <div style={{ margin: "0px 24px 12px 24px" }}>
            <Input
              label="비밀번호"
              value={pwdValue}
              onChangeHandler={onChangePwd}
            />
          </div>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              backgrond={"#7bab6e"}
              context={"로그인하기"}
              color={"#ffffff"}
              arrowColor={"#ffffff"}
              margin={"0px 24px 12px 24px"}
            />
          </Link>
          <div style={{ marginTop: "16px", marginBottom: "45px" }}>
            <SubLink href="/findAccount">
              아이디 또는 비밀번호를 잊으셨나요?
            </SubLink>
          </div>
        </div>
      </BottomBtnWrapper>
    </LoginWrapper>
  );
};

export default LoginPage;

const SubLink = styled.a`
  color: #7bab6e;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

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
  padding: 20px 0px;
`;
