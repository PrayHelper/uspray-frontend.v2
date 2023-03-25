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
    'matchingPwd': '',
    'name': '',
    'year': '',
    'month': '',
    'day': '',
    'phoneNumber': '',
    'certificateNumber': '',
  });
  const [gender, setGender] = useState("");

  const idChangeHandler = (e) => {
    setUserInfo({...userInfo, id: e.target.value});
  }

  const pwdChangeHandler = (e) => {
    setUserInfo({...userInfo, pwd: e.target.value});
  }

  const matchingPwdChangeHandler = (e) => {
    setUserInfo({...userInfo, matchingPwd: e.target.value});
  }

  const nameChangeHandler = (e) => {
    setUserInfo({...userInfo, name: e.target.value});
  }
  
  const yearChangeHandler = (e) => {
    setUserInfo({...userInfo, year: e.target.value});
  }
  
  const monthChangeHandler = (e) => {
    setUserInfo({...userInfo, month: e.target.value});
  }
  
  const dayChangeHandler = (e) => {
    setUserInfo({...userInfo, day: e.target.value});
  }
  
  const phoneNumberChangeHandler = (e) => {
    setUserInfo({...userInfo, phoneNumber: e.target.value});
  }

  const certificateNumberChangeHandler = (e) => {
    setUserInfo({...userInfo, certificateNumber: e.target.value});
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
        <Input label="아이디" onChangeHandler={idChangeHandler} value={userInfo.id} isError={false}
        description=""/>
        <Input label="비밀번호" type="password" onChangeHandler={pwdChangeHandler} value={userInfo.pwd} isError={false}
        description=""/>
        <Input label="비밀번호 확인" type="password" onChangeHandler={matchingPwdChangeHandler} value={userInfo.matchingPwd} isError={false}
        description=""/>
        <Input label="이름" onChangeHandler={nameChangeHandler} value={userInfo.name} isError={false}
        description=""/>
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
        <InputBirth yearChangeHandler={yearChangeHandler} monthChangeHandler={monthChangeHandler} dayChangeHandler={dayChangeHandler}/>
        <Input label="전화번호" onChangeHandler={phoneNumberChangeHandler} value={userInfo.phoneNumber} isError={false}
        description={<Button buttonSize={ButtonSize.NORMAL} buttonTheme={userInfo.phoneNumber == "" ? ButtonTheme.GRAY : ButtonTheme.GREEN} disabled={false} handler={() => {console.log('전화번호 클릭')}}>전송</Button>} />
        <Input label="인증번호" onChangeHandler={certificateNumberChangeHandler} value={userInfo.certificateNumber} isError={false}
        description={<Button buttonSize={ButtonSize.NORMAL} buttonTheme={userInfo.certificateNumber == "" ? ButtonTheme.GRAY : ButtonTheme.GREEN} disabled={false} handler={() => {console.log('인증번호 클릭')}}>확인</Button>} />
        <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GRAY} handler={() => {console.log(userInfo)}}>회원가입</Button>
      </div>
    </div>
  );
};

export default Signup;
