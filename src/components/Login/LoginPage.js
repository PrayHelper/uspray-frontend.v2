import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import serverapi from "../../api/serverapi";
import Input from "../Input/Input";
import Button, { ButtonSize, ButtonTheme } from "../Button/Button";
import Toast, { ToastTheme } from "../Toast/Toast";
import useFlutterWebview from "../../hooks/useFlutterWebview";
import useAuthToken from "../../hooks/useAuthToken";

const LoginPage = () => {
  const [idValue, setIdValue] = useState("");
  const [pwdValue, setPwdValue] = useState("");
  const { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken } =
    useAuthToken();

  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { isMobile, getDeviceToken, storeAuthToken } = useFlutterWebview();

  const onChangeId = (event) => {
    setIdValue(event.target.value);
  };
  const onChangePwd = (event) => {
    setPwdValue(event.target.value);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const sendDeviceToken = async (token) => {
    const api = "/user/device/token";
    const data = {
      device_token: token,
    };
    try {
      const res = await serverapi.post(api, data);
      console.log(
        `sendDeviceToken(${token}) called, with response status ${res.status}`
      );
    } catch (e) {
      console.log(
        `sendDeviceToken(${token}) called, with response status failed`
      );
    }
  };

  const login = async () => {
    const api = `/user/login`;
    const data = {
      id: idValue,
      password: pwdValue,
    };
    try {
      const res = await serverapi.post(api, data);
      if (res.status === 200) {
        if (isMobile()) {
          const deviceToken = await getDeviceToken();
          await sendDeviceToken(deviceToken);
        } else {
          setToastMessage("푸쉬 알림은 모바일에서만 받을 수 있습니다.");
          setShowToast(true);
        }

        navigate("/main");

        console.log("access: ", res.data.access_token);
        console.log("refresh: ", res.data.refresh_token);

        setAccessToken(res.data.access_token);
        await setRefreshToken(res.data.refresh_token);

        console.log("access: ", getAccessToken());
        console.log("refresh: ", await getRefreshToken());
      }
    } catch (e) {
      if (e.response.status === 400) {
        setToastMessage("회원정보가 일치하지 않습니다.");
        setShowToast(true);
      }
    }
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
              type="password"
              onChangeHandler={onChangePwd}
            />
          </div>

          <div style={{ margin: "0px 24px 12px 24px" }}>
            <Button
              buttonSize={ButtonSize.LARGE}
              ButtonTheme={ButtonTheme.GREEN}
              disabled={
                idValue.length > 0 && pwdValue.length > 0 ? false : true
              }
              handler={() => {
                login();
              }}
            >
              로그인
            </Button>
          </div>
          <div style={{ marginTop: "16px", marginBottom: "45px" }}>
            <SubLink href="/findAccount">
              아이디 또는 비밀번호를 잊으셨나요?
            </SubLink>
          </div>
        </div>
      </BottomBtnWrapper>
      {showToast && <Toast toastTheme={ToastTheme.ERROR}>{toastMessage}</Toast>}
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
  transition: all 0.5s;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  transition: all 0.5s;
  width: 204px;
`;

const LogoTitle = styled.div`
  transition: all 0.5s;
  color: #75bd62;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const LogoSubTitle = styled.div`
  transition: all 0.5s;
  color: #75bd62;
  font-size: 24px;
`;

const BottomBtnWrapper = styled.div`
  width: 100%;
  padding: 20px 0px;
`;
