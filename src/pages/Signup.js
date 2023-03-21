import ToggleButton from "../components/ToggleButton";
import React, { useEffect, useState } from "react";
import InputText from "../components/InputText";
import UserHeader from "../components/UserHeader";
import InputBirth from "../components/InputBirth";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import Input from "../components/Input/Input";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    'id': '',
    'pwd': '',
    'name': ''
  });
  const [gender, setGender] = useState("");

  const idChangeHandler = (e) => {
    setUserInfo({...userInfo, id: e.target.value});
  }

  return (
    <div>
      <UserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
        }}
      >
        <InputText label="아이디" type="text" />
        <InputText label="비밀번호" type="password" />
        <InputText label="비밀번호 확인" type="password" />
        <InputText label="이름" type="text" />
        <div style={{ position: "relative" }}>
          <div
            style={{
              fontSize: "12px",
              color: "#7BAB6E",
              paddingLeft: "16px",
              position: "absolute",
              top: "-14px",
            }}
          >
            성별
          </div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
            }}
          >
            <ToggleButton contents="남자" item={gender} setter={setGender} />
            <ToggleButton contents="여자" item={gender} setter={setGender} />
          </div>
        </div>
        <InputBirth />
        <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GRAY}>회원가입</Button>
        <Input label="아이디" onChangeHandler={idChangeHandler} value={userInfo.id} isError={false}
        description="사용 가능한 아이디입니다." />
      </div>
    </div>
  );
};

export default Signup;
