import axios from "axios";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CheckId from "./CheckId";
import CheckPwd from "./CheckPwd";

const LoginPage = () => {
  const [idValue, setIdValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");

  const onClickLogin = async () => {
    const api = `api/user/dup_check/${idValue}`;
    console.log(idValue);
    try {
      const res = await axios.get(api);
      if (res.status === 200) {
        console.log("dup: ", res.data.dup);
        if (!res.data.dup) {
          alert("아이디가 존재하지 않음");
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const onClickPwd = async () => {
    const api = "api/user/login";
    const data = {
      id: idValue,
      password: pwdValue,
    };
    try {
      const res = await axios.post(api, data);
      if (res.status === 200) {
        alert("로그인 성공");
      }
    } catch (error) {
      alert("비밀번호 불일치");
    }
  };

  const onChangeId = (event) => {
    setIdValue(event.target.value);
  };
  const onChangePwd = (event) => {
    setPwdValue(event.target.value);
    console.log(event.target.value);
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
          <Route
            path="/"
            element={
              <CheckId
                onChangeId={onChangeId}
                onClickLinkBtn={onClickLogin}
                idValue={idValue}
              />
            }
          ></Route>
          <Route
            path="/pwd"
            element={
              <CheckPwd
                idValue={idValue}
                pwdValue={pwdValue}
                onChangePwd={onChangePwd}
                onClickLinkBtn={onClickPwd}
              />
            }
          ></Route>
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
