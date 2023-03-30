import ToggleButton from "../components/ToggleButton";
import React, { useEffect, useState } from "react";
import InputText from "../components/InputText";
import UserHeader from "../components/UserHeader";
import InputBirth from "../components/InputBirth";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import Input from "../components/Input/Input";
import styled from "styled-components";
import axios from "axios";

let init = 0;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  max-width: 342px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 16px;
  gap: 8px;
  border-radius: 16px;
  color: #7bab6e;
`;

const ModalButton = styled.button`
  width: 100%;
  height: 66px;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 20px 0;
  color: #ffffff;
  font-size: 18px;
`;

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    matchingPwd: "",
    name: "",
    year: "",
    month: "",
    day: "",
    phoneNumber: "",
    certificateNumber: "",
  });
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [invalidIdInfo, setInvalidIdInfo] = useState("");
  const [invalidPwdInfo, setInvalidPwdInfo] = useState("");
  const [invalidMatchingPwdInfo, setInvalidMatchingPwdInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verficationNumber, setVerficationNumber] = useState("");

  const idRegEx = /^[a-z0-9]{6,15}$/;
  const pwdRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;
  const phoneNumberRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const certificateNumberRegEx = /^[0-9]{6}$/;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const makeBirthDateString = () => {
    //TODO: signup 버튼 눌렀을 때 연결해서 보내는걸로 수정하기
    setBirthDate(userInfo.year + "-" + userInfo.month + "-" + userInfo.day);
  };

  const idCheck = (userInfo) => {
    return idRegEx.test(userInfo);
  };

  const pwdCheck = (userInfo) => {
    return pwdRegEx.test(userInfo);
  };

  const phoneNumberCheck = (userInfo) => {
    console.log(userInfo);
    console.log(phoneNumberRegEx.test(userInfo));
    return phoneNumberRegEx.test(userInfo);
  };

  const certificateNumberCheck = (userInfo) => {
    return certificateNumberRegEx.test(userInfo);
  };

  const isIdDuplicated = async (uid) => {
    // cors설정 이후에는 이걸로
    // const api = `${process.env.REACT_APP_API_ORIGIN}/api/user/dup_check/${uid}`;
    // proxy 설정일 경우
    const api = `api/user/dup_check/${uid}`;
    try {
      const res = await axios.get(api);
      if (res.status == 200) {
        console.log("dup: ", res.data.dup);
        return res.data.dup;
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  const phoneNumVerfication = async (phoneNumber) => {
    const api = "api/admin/sms";
    const data = {
      phone: phoneNumber,
    };
    try {
      const res = await axios.post(api, data);
      if (res.status == 200) {
        alert("인증번호가 전송되었습니다.");
        console.log(res);
        setVerficationNumber(res.data);
      }
    } catch (e) {
      alert("error occured");
    }
  };

  const idChangeHandler = async (e) => {
    setUserInfo({ ...userInfo, id: e.target.value });
    if (!idCheck(e.target.value)) {
      setInvalidIdInfo("6-15자의 영문 소문자, 숫자만 사용 가능");
      return;
    }
    if (await isIdDuplicated(e.target.value)) {
      setInvalidIdInfo("아이디가 중복되었습니다.");
      return;
    }
    setInvalidIdInfo("");
  };

  const pwdChangeHandler = (e) => {
    setUserInfo({ ...userInfo, pwd: e.target.value });
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
  };

  const matchingPwdChangeHandler = (e) => {
    setUserInfo({ ...userInfo, matchingPwd: e.target.value });
    if (userInfo.pwd !== e.target.value) {
      setInvalidMatchingPwdInfo("비밀번호가 서로 다릅니다.");
      return;
    }
    setInvalidMatchingPwdInfo("");
  };

  const nameChangeHandler = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const nameFocusHandler = () => {
    if (init == 0) {
      setShowModal(true);
      init = 1;
    }
  };

  const yearChangeHandler = (e) => {
    setUserInfo({ ...userInfo, year: e.target.value });
  };

  const monthChangeHandler = (e) => {
    setUserInfo({ ...userInfo, month: e.target.value });
  };

  const dayChangeHandler = (e) => {
    setUserInfo({ ...userInfo, day: e.target.value });
  };

  // const phoneNumberChangeHandler = (e) => {
  //   setUserInfo({
  //     ...userInfo,
  //     phoneNumber: e.target.value
  //       .replace(/[^0-9]/g, "")
  //       .replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`),
  //   });
  // };

  const phoneNumberChangeHandler = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    let formattedValue = '';
    
    if (value.length > 3) {
      formattedValue += value.substring(0, 3) + '-';
    }
    
    if (value.length > 7) {
      formattedValue += value.substring(3, 7) + '-';
      formattedValue += value.substring(7, 11);
    } else if (value.length > 3) {
      formattedValue += value.substring(3, 7);
    } else {
      formattedValue += value;
    }
    
    setUserInfo({...userInfo, phoneNumber: formattedValue});
  }

  const certificateNumberChangeHandler = (e) => {
    setUserInfo({ ...userInfo, certificateNumber: e.target.value });
  };

  return (
    <div>
      <UserHeader />
      {showModal && (
        <ModalWrapper onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src="images/notice_icon.svg" alt="notice_icon" />
            <div
              style={{
                fontSize: "20px",
                color: "#7BAB6E",
                fontWeight: "700",
                paddingBottom: "2px",
              }}
            >
              이름은 실명으로 설정해주세요!
            </div>
            <div
              style={{
                marginBottom: "28px",
              }}
            >
              기도제목 공유 시 이름으로 전달됩니다.
            </div>
            <ModalButton onClick={handleCloseModal}>
              네, 그렇게 할게요.
            </ModalButton>
          </ModalContent>
        </ModalWrapper>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
        }}
      >
        <Input
          label="아이디"
          onChangeHandler={idChangeHandler}
          value={userInfo.id}
          isError={!!invalidIdInfo}
          description={invalidIdInfo}
        />
        <Input
          label="비밀번호"
          type="password"
          onChangeHandler={pwdChangeHandler}
          value={userInfo.pwd}
          isError={!!invalidPwdInfo}
          description={invalidPwdInfo}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          onChangeHandler={matchingPwdChangeHandler}
          value={userInfo.matchingPwd}
          isError={!!invalidMatchingPwdInfo}
          description={invalidMatchingPwdInfo}
        />
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
              color: !gender ? "#FF6B6B" : "#7BAB6E",
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
            <ToggleButton
              isErrored={!gender}
              contents="남자"
              item={gender}
              setter={setGender}
            />
            <ToggleButton
              isErrored={!gender}
              contents="여자"
              item={gender}
              setter={setGender}
            />
          </div>
        </div>
        <InputBirth
          yearChangeHandler={yearChangeHandler}
          monthChangeHandler={monthChangeHandler}
          dayChangeHandler={dayChangeHandler}
        />
        <Input
          label="전화번호"
          onChangeHandler={phoneNumberChangeHandler}
          value={userInfo.phoneNumber}
          isError={false}
          description={
            <Button
              buttonSize={ButtonSize.NORMAL}
              buttonTheme={
                phoneNumberCheck(userInfo.phoneNumber)
                  ? ButtonTheme.GREEN
                  : ButtonTheme.GRAY
              }
              disabled={false}
              handler={() => {phoneNumVerfication(userInfo.phoneNumber.replace(/-/g, ""))}}
            >
              전송
            </Button>
          }
        />
        <Input
          label="인증번호"
          onChangeHandler={certificateNumberChangeHandler}
          value={userInfo.certificateNumber}
          isError={false}
          description={
            <Button
              buttonSize={ButtonSize.NORMAL}
              buttonTheme={
                certificateNumberCheck(userInfo.certificateNumber)
                  ? ButtonTheme.GREEN
                  : ButtonTheme.GRAY
              }
              disabled={false}
              handler={() => {
                console.log("인증번호 클릭");
              }}
            >
              확인
            </Button>
          }
        />
        <Button
          buttonSize={ButtonSize.LARGE}
          buttonTheme={ButtonTheme.GRAY}
          handler={() => {
            console.log(userInfo);
          }}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default Signup;
