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
  const [invalidIdInfo, setInvalidIdInfo] = useState("");
  const [invalidPwdInfo, setInvalidPwdInfo] = useState("");
  const [invalidMatchingPwdInfo, setInvalidMatchingPwdInfo] = useState("");

  const idRegEx = /^[a-z0-9]{6,15}$/;
  const pwdRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;

  const idCheck = (userInfo) => {
    return idRegEx.test(userInfo);
  }

  const pwdCheck = (userInfo) => {
    return pwdRegEx.test(userInfo);
  }

  const idChangeHandler = (e) => {
    setUserInfo({...userInfo, id: e.target.value});
    if (!idCheck(e.target.value)) {
      setInvalidIdInfo("6-15자의 영문 소문자, 숫자만 사용 가능");
      return;
    }
    setInvalidIdInfo("");
  }

  const pwdChangeHandler = (e) => {
    setUserInfo({...userInfo, pwd: e.target.value});
    if (!pwdCheck(e.target.value)) {
      setInvalidPwdInfo("8-16자의 영문 대소문자, 숫자, 특수문자만 사용 가능");
      return;
    }
    if (userInfo.matchingPwd || invalidMatchingPwdInfo) {
      if (e.target.value !== userInfo.matchingPwd) {
        setInvalidMatchingPwdInfo("비밀번호가 서로 다릅니다.");
      } else {
        setInvalidMatchingPwdInfo("");
      }
    }
    setInvalidPwdInfo("");
  }

  const matchingPwdChangeHandler = (e) => {
    setUserInfo({...userInfo, matchingPwd: e.target.value});
    if (userInfo.pwd !== e.target.value) {
      setInvalidMatchingPwdInfo("비밀번호가 서로 다릅니다.");
      return;
    }
    setInvalidMatchingPwdInfo("");
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
        <Input label="아이디" onChangeHandler={idChangeHandler} value={userInfo.id} isError={!!invalidIdInfo}
        description={invalidIdInfo}/>
        <Input label="비밀번호" type="password" onChangeHandler={pwdChangeHandler} value={userInfo.pwd} isError={!!invalidPwdInfo}
        description={invalidPwdInfo}/>
        <Input label="비밀번호 확인" type="password" onChangeHandler={matchingPwdChangeHandler} value={userInfo.matchingPwd} isError={!!invalidMatchingPwdInfo}
        description={invalidMatchingPwdInfo}/>
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
