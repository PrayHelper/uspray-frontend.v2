import { useState } from "react";
import serverapi from "../api/serverapi";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import Input from "../components/Input/Input";
import UserHeader from "../components/UserHeader";

const ChangePw = () => {
  const [pw, setPw] = useState("");
  const [matchingPw, setMatchingPw] = useState("");
  const [invalidPwInfo, setInvalidPwInfo] = useState("");
  const [invalidMatchingPwInfo, setInvalidMatchingPwInfo] = useState("");

  const isAllValid = pw && matchingPw && !invalidPwInfo && !invalidMatchingPwInfo;

  const pwRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;

  const pwCheck = (pw) => {
    return pwRegEx.test(pw);
  }

  const pwChangeHandler = (e) => {
    setPw(e.target.value);
    if (!pwCheck(e.target.value)) {
      setInvalidPwInfo("8-16자의 영문 대소문자, 숫자, 특수문자만 사용 가능");
      return;
    }
    if (matchingPw || invalidMatchingPwInfo) {
      if (e.target.value !== matchingPw) {
        setInvalidMatchingPwInfo("비밀번호가 서로 다릅니다.");
      } else {
        setInvalidMatchingPwInfo("");
      }
    }
    setInvalidPwInfo("");
  };

  const matchingPwChangeHandler = (e) => {
    setMatchingPw(e.target.value);
    if (pw !== e.target.value) {
      setInvalidMatchingPwInfo("비밀번호가 서로 다릅니다.");
      return;
    }
    setInvalidMatchingPwInfo("");
  };

  //TODO: 전역으로 관리되는 accessToken과 userId로 대체하기
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2OWIwOWIxLTIwODAtNDdkNS05ZDRhLTk5NjNlNWE4MTJkNSIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE4VDA1OjIyOjI2LjkwMTM3MiJ9.vgZZ1xbBloYQz0EKvbRCHDNkBqu75CPu523ufLhSfPE";

  const resetPw = async () => {
    const api = "/user/reset/password";
    const data = {
      password: pw
    };
    try {
      const res = await serverapi.put(api, data, {
        headers: {
          Authorization: `${accessToken}`,
        }
      });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <UserHeader>비밀번호 변경</UserHeader>
      <div
        style={{
          width: "100%",
          gap: "24px",
          marginTop: "64px",
        }}
      >
         <div style={{padding: "0 16px", display: "flex", flexDirection: "column", gap: "24px"}}>
          <Input label="비밀번호" type="password" value={pw} onChangeHandler={pwChangeHandler} isError={!!invalidPwInfo} description={invalidPwInfo}/>
          <Input label="비밀번호 확인" type="password" value={matchingPw} onChangeHandler={matchingPwChangeHandler} isError={!!invalidMatchingPwInfo} description={invalidMatchingPwInfo}/>
          <div style={{ position: "absolute", bottom: "40px", width: "calc(100% - 32px)", display: "flex", flexDirection: "column" }}>
            <Button
              disabled={!isAllValid}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={isAllValid ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              handler={() => {
                resetPw();
              }}
            >
              재설정하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePw;
