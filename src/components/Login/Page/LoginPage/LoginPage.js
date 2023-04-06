import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CheckId from "./CheckId";
import CheckPwd from "./CheckPwd";

const LoginPage = () => {
  const [idValue, setIdValue] = useState("");

  const onChangeId = (event) => {
    setIdValue(event.target.value);
  };

  return (
    <LoginWrapper>
      <LogoWrapper>
        <LogoImg src="images/logo_image.svg" alt="logo" />
        <LogoTitle>Uspray</LogoTitle>
        <LogoSubTitle>너에게 기도를, 유스프레이</LogoSubTitle>
      </LogoWrapper>
      <BottomBtnWrapper>
        <Routes>
          <Route path="/" element={<CheckId onChangeId={onChangeId} />}></Route>
          <Route path="/pwd" element={<CheckPwd idValue={idValue} />}></Route>
        </Routes>
      </BottomBtnWrapper>
    </LoginWrapper>
  );
};

export default LoginPage;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
  padding: 20px 0px;
`;
