import React, { useState } from "react";
import serverapi from "../api/serverapi";
import Input from "../components/Input/Input";
import ToggleButton from "../components/ToggleButton";
import InputBirth from "../components/InputBirth";
import UserHeader from "../components/UserHeader";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import Signup from "./Signup";

let init = 0;

const SocialSignup = () => {
  const [gender, setGender] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    year: "",
    month: "",
    day: "",
    phoneNumber: "",
  });

  const phoneNumberRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

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

  const phoneNumberChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
    let formattedValue = "";

    if (value.length > 3) {
      formattedValue += value.substring(0, 3) + "-";
    }

    if (value.length > 7) {
      formattedValue += value.substring(3, 7) + "-";
      formattedValue += value.substring(7, 11);
    } else if (value.length > 3) {
      formattedValue += value.substring(3, 7);
    } else {
      formattedValue += value;
    }

    setUserInfo({ ...userInfo, phoneNumber: formattedValue });
  };

  return (
    <div style={{ width: "100%" }}>
      <UserHeader>회원가입</UserHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
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
        <Input
          label="전화번호"
          onChangeHandler={phoneNumberChangeHandler}
          value={userInfo.phoneNumber}
          isError={false}
          // description={
          //   <Button
          //     buttonSize={ButtonSize.NORMAL}
          //     buttonTheme={
          //       phoneNumberCheck(userInfo.phoneNumber)
          //         ? ButtonTheme.GREEN
          //         : ButtonTheme.GRAY
          //     }
          //     disabled={!phoneNumberCheck(userInfo.phoneNumber) || time}
          //     handler={() => {
          //       phoneNumVerfication(userInfo.phoneNumber.replace(/-/g, ""));
          //       setIsCertificated(false);
          //       setIsCertificateButtonClicked(false);
          //       setUserInfo({ ...userInfo, certificateNumber: "" });
          //       setIsPhoneNumVerficationButtonClickClick(true);
          //     }}>
          //     {time ? "진행 중" : "전송"}
          //   </Button>
          // }
        />
      </div>
      {/* <Button
        disabled={!isAllValid}
        buttonSize={ButtonSize.LARGE}
        buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
        handler={() => {
          Signup();
        }}>
        회원가입
      </Button> */}
      회원가입
    </div>
  );
};

export default SocialSignup;
