import React, { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import ToggleButton from "../components/ToggleButton";
import InputBirth from "../components/InputBirth";
import UserHeader from "../components/UserHeader";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastTheme } from "../components/Toast/Toast";
import serverapi from "../api/serverapi";

let init = 0;

const KakaoSignup = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastTheme, setToastTheme] = useState(ToastTheme.SUCCESS);
  const [toastMessage, setToastMessage] = useState("");

  const [gender, setGender] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    year: "",
    month: "",
    day: "",
  });

  const { userId } = useLocation();
  const navigate = useNavigate();

  const kakaoSignupHandler = async () => {
    const api = "/user/oauth/signup";
    const data = {
      name: userInfo.name,
      gender: gender,
      birth: userInfo.year + "-" + userInfo.month + "-" + userInfo.day,
      user_id: userId,
    };
    try {
      console.log("api: ", api);
      console.log("data: ", data);

      const res = await serverapi.post(api, data);
      if (res.status === 200) {
        setToastMessage("회원가입이 성공적으로 완료되었습니다.");
        setShowToast(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (e) {
      alert("error occured");
    }
  };

  const checkEmptyUserInfoValue = Object.values(userInfo).some(
    (data) => data === ""
  );

  const isAllValid = gender && !checkEmptyUserInfoValue;

  const nameChangeHandler = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const nameFocusHandler = () => {
    if (init === 0) {
      setShowModal(true);
      init = 1;
    }
  };

  const yearChangeHandler = (e) => {
    setUserInfo({ ...userInfo, year: e.target.value.slice(0, 4) });
  };

  const monthChangeHandler = (e) => {
    setUserInfo({ ...userInfo, month: e.target.value.slice(0, 2) });
  };

  const dayChangeHandler = (e) => {
    setUserInfo({ ...userInfo, day: e.target.value.slice(0, 2) });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
      <UserHeader>회원가입</UserHeader>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px 24px 40px 24px",
          height: "100%",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "27px",
          }}>
          <Input
            label="이름"
            onChangeHandler={nameChangeHandler}
            value={userInfo.name}
            isError={false}
            description=""
            onFocusHandler={nameFocusHandler}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: "12px",
                color: "#7BAB6E",
                paddingLeft: "16px",
                position: "absolute",
                top: "-14px",
              }}>
              성별
            </div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
              }}>
              <ToggleButton contents="남자" item={gender} setter={setGender} />
              <ToggleButton contents="여자" item={gender} setter={setGender} />
            </div>
          </div>
          <InputBirth
            yearValue={userInfo.year}
            monthValue={userInfo.month}
            dayValue={userInfo.day}
            yearChangeHandler={yearChangeHandler}
            monthChangeHandler={monthChangeHandler}
            dayChangeHandler={dayChangeHandler}
          />
        </div>
        <Button
          disabled={!isAllValid}
          buttonSize={ButtonSize.LARGE}
          buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
          handler={() => {
            kakaoSignupHandler();
          }}>
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default KakaoSignup;
