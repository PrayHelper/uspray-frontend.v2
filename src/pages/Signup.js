import ToggleButton from "../components/ToggleButton";
import React, { useEffect, useRef, useState } from "react";
import UserHeader from "../components/UserHeader";
import InputBirth from "../components/InputBirth";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import Input from "../components/Input/Input";
import styled from "styled-components";
import Toast, { ToastTheme } from "../components/Toast/Toast";
import Checkbox from "../components/Checkbox/Checkbox";
import serverapi from "../api/serverapi";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { useNavigate } from "react-router-dom";

let init = 0;

const ModalContent = styled.div`
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${(props) =>
    props.isModalOn ? "translate(-50%, -50%)" : "translate(-50%, -40%)"};
  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  color: #7bab6e;
  z-index: 500;

  opacity: ${(props) => (props.isModalOn ? "1" : "0")};
  pointer-events: ${(props) => (props.isModalOn ? "auto" : "none")};
`;

const ModalButton = styled.button`
  transition: 0.2s all ease-in-out;
  width: 100%;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 20px 0;
  color: #ffffff;
  font-size: 18px;

  &:active {
    transition: 0.2s all ease-in-out;
    transform: scale(0.98);
    filter: brightness(0.9);
  }
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
  const [invalidIdInfo, setInvalidIdInfo] = useState("");
  const [invalidPwdInfo, setInvalidPwdInfo] = useState("");
  const [invalidMatchingPwdInfo, setInvalidMatchingPwdInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verficationNumber, setVerficationNumber] = useState("");
  const [time, setTime] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastTheme, setToastTheme] = useState(ToastTheme.SUCCESS);
  const [isCetrificated, setIsCertificated] = useState(false);
  const [isCertificateButtonClicked, setIsCertificateButtonClicked] =
    useState(false);
  const [
    isPhoneNumVerficationButtonClicked,
    setIsPhoneNumVerficationButtonClickClick,
  ] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [tos1Checked, setTos1Checked] = useState(false);
  const [tos2Checked, setTos2Checked] = useState(false);
  const [tos3Checked, setTos3Checked] = useState(false);
  const checkEmptyUserInfoValue = Object.values(userInfo).some(
    (data) => data === ""
  );

  const navigate = useNavigate();

  const isAllValid =
    !invalidIdInfo &&
    !invalidPwdInfo &&
    !invalidMatchingPwdInfo &&
    isCetrificated &&
    isCertificateButtonClicked &&
    tos1Checked &&
    tos2Checked &&
    tos3Checked &&
    gender &&
    !checkEmptyUserInfoValue;

  const idRegEx = /^[a-z0-9]{6,15}$/;
  const pwdRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;
  const phoneNumberRegEx = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const certificateNumberRegEx = /^[0-9]{6}$/;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const idCheck = (userInfo) => {
    return idRegEx.test(userInfo);
  };

  const pwdCheck = (userInfo) => {
    return pwdRegEx.test(userInfo);
  };

  const phoneNumberCheck = (userInfo) => {
    return phoneNumberRegEx.test(userInfo);
  };

  const certificateNumberCheck = (userInfo) => {
    return certificateNumberRegEx.test(userInfo);
  };

  const isIdDuplicated = async (uid) => {
    const api = `/user/dup_check/${uid}`;
    try {
      const res = await serverapi.get(api);
      if (res.status === 200) {
        return res.data.dup;
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  const phoneNumVerfication = async (phoneNumber) => {
    const api = "/admin/sms";
    const data = {
      phone: phoneNumber,
    };
    try {
      const res = await serverapi.post(api, data);
      if (res.status === 200) {
        alert("인증번호가 전송되었습니다.");
        console.log(res.data.code);
        setVerficationNumber(res.data.code);
        setTime("180");
      }
    } catch (e) {
      alert("error occured");
    }
  };

  const signup = async () => {
    const api = "/user/signup";
    const data = {
      id: userInfo.id,
      password: userInfo.pwd,
      name: userInfo.name,
      gender: gender,
      birth: userInfo.year + "-" + userInfo.month + "-" + userInfo.day,
      phone: userInfo.phoneNumber.replace(/-/g, ""),
    };
    try {
      const res = await serverapi.post(api, data);
      if (res.status === 200) {
        setToastMessage("회원가입이 성공적으로 완료되었습니다.");
        setToastTheme(ToastTheme.SUCCESS);
        setShowToast(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
      if (e.response.data.dev_message === "SignUpFail error")
        alert(e.response.data.message);
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

  const certificateNumberChangeHandler = (e) => {
    setUserInfo({ ...userInfo, certificateNumber: e.target.value });
  };

  const isCertificationNumberValid = (certificateNumber) => {
    if (verficationNumber == certificateNumber) {
      setIsCertificated(true);
      return true;
    } else {
      setIsCertificated(false);
      return false;
    }
  };

  const changeTimeFormat = (time) => {
    let minutes = parseInt(time / 60);
    let seconds = time % 60;
    let result;
    if (parseInt(minutes / 10) === 0) minutes = `0${minutes}`;
    if (parseInt(seconds / 10) === 0) seconds = `0${seconds}`;
    result = `${minutes}:${seconds}`;
    return result;
  };

  useEffect(() => {
    if (time === "") return;
    if (isCetrificated && isCertificateButtonClicked) {
      setTime("");
      return;
    }
    const id = setInterval(() => {
      if (time > 0) setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [time]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  function handleTos1Change(event) {
    setTos1Checked(event.target.checked);
  }

  function handleTos2Change(event) {
    setTos2Checked(event.target.checked);
  }

  function handleTos3Change(event) {
    setTos3Checked(event.target.checked);
  }

  return (
    <div>
      <UserHeader>회원가입</UserHeader>
      <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
      <ModalContent isModalOn={showModal} onClick={(e) => e.stopPropagation()}>
        <img
          src="images/icon_notice.svg"
          alt="icon_notice"
          style={{
            marginBottom: "8px",
          }}
        />
        <div
          style={{
            fontSize: "20px",
            color: "#7BAB6E",
            fontWeight: "700",
            marginBottom: "2px",
          }}
        >
          이름은 실명으로 설정해주세요!
        </div>
        <div
          style={{
            marginBottom: "36px",
          }}
        >
          기도제목 공유 시 이름으로 전달됩니다.
        </div>
        <ModalButton onClick={handleCloseModal}>네, 그렇게 할게요.</ModalButton>
      </ModalContent>
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
          description={
            <Button
              buttonSize={ButtonSize.NORMAL}
              buttonTheme={
                phoneNumberCheck(userInfo.phoneNumber)
                  ? ButtonTheme.GREEN
                  : ButtonTheme.GRAY
              }
              disabled={!phoneNumberCheck(userInfo.phoneNumber) || time}
              handler={() => {
                phoneNumVerfication(userInfo.phoneNumber.replace(/-/g, ""));
                setIsCertificated(false);
                setIsCertificateButtonClicked(false);
                setUserInfo({ ...userInfo, certificateNumber: "" });
                setIsPhoneNumVerficationButtonClickClick(true);
              }}
            >
              {time ? "진행 중" : "전송"}
            </Button>
          }
        />
        <Input
          label="인증번호"
          onChangeHandler={certificateNumberChangeHandler}
          value={
            isCetrificated && isCertificateButtonClicked
              ? "인증에 성공하였습니다."
              : time === 0
              ? "인증번호가 만료되었습니다."
              : userInfo.certificateNumber
          }
          isError={
            (!isCetrificated && isCertificateButtonClicked) || time === 0
          }
          description={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {time !== "" && <span>{changeTimeFormat(time)}</span>}
              <Button
                buttonSize={ButtonSize.NORMAL}
                buttonTheme={
                  certificateNumberCheck(userInfo.certificateNumber)
                    ? !isCetrificated && isCertificateButtonClicked
                      ? time === 0
                        ? ButtonTheme.GRAY
                        : ButtonTheme.RED
                      : time === 0
                      ? ButtonTheme.GRAY
                      : ButtonTheme.GREEN
                    : ButtonTheme.GRAY
                }
                disabled={
                  (isCetrificated && isCertificateButtonClicked) ||
                  time === 0 ||
                  !isPhoneNumVerficationButtonClicked
                }
                handler={() => {
                  console.log(isCetrificated && isCertificateButtonClicked);
                  console.log(time === 0);
                  setIsCertificateButtonClicked(true);
                  if (isCertificationNumberValid(userInfo.certificateNumber)) {
                    alert("인증에 성공하였습니다.");
                  } else {
                    setToastMessage("인증번호가 일치하지 않습니다.");
                    setToastTheme(ToastTheme.ERROR);
                    setShowToast(true);
                    alert("인증에 실패하였습니다.");
                  }
                }}
              >
                {isCetrificated || isCertificateButtonClicked ? "완료" : "확인"}
              </Button>
            </div>
          }
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <Checkbox
            id="tos1"
            label={"만 14세 이상입니다."}
            checked={tos1Checked}
            handler={handleTos1Change}
          />
          <Checkbox
            link={"/tos"}
            id="tos2"
            label={"에 동의합니다."}
            linklabel={"서비스 이용약관"}
            checked={tos2Checked}
            handler={handleTos2Change}
          />
          <Checkbox
            link={"/privacyProcessAgreement"}
            id="tos3"
            label={"에 동의합니다."}
            linklabel={"개인정보 수집 및 이용"}
            checked={tos3Checked}
            handler={handleTos3Change}
          />
        </div>
        <Button
          disabled={!isAllValid}
          buttonSize={ButtonSize.LARGE}
          buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
          handler={() => {
            signup();
          }}
        >
          회원가입
        </Button>

        {showToast && <Toast toastTheme={toastTheme}>{toastMessage}</Toast>}
        {showToast && <Toast toastTheme={toastTheme}>{toastMessage}</Toast>}
      </div>
    </div>
  );
};

export default Signup;
