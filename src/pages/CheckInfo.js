import UserHeader from "../components/UserHeader";
import Input from "../components/Input/Input";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import { useEffect, useState } from "react";
import serverapi from "../api/serverapi";
import { useNavigate } from "react-router-dom";
import Toast, { ToastTheme } from "../components/Toast/Toast";

const CheckInfo = () => {
  const [password, setPassword] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  const pwRegEx = /^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~\[\]\\;',./]{8,16}$/;

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const pwCheck = (pw) => {
    return pwRegEx.test(pw);
  }


  useEffect(() => {
    if (showErrorToast) {
      const timer = setTimeout(() => {
        setShowErrorToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorToast]);

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2OWIwOWIxLTIwODAtNDdkNS05ZDRhLTk5NjNlNWE4MTJkNSIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE4VDA1OjIyOjI2LjkwMTM3MiJ9.vgZZ1xbBloYQz0EKvbRCHDNkBqu75CPu523ufLhSfPE";

  const checkPassword = async (password) => {
    const api = "/user/check/pw";
    const data = {
      password: password,
    };
    try {
      const res = await serverapi.post(api, data, {
        headers: {
          Authorization: `${accessToken}`,
        }
      });
      if (res.status === 200) {
        console.log(res);
        if (res.data.message === true)
          navigate("/changeInfo");
        else{
          setShowErrorToast(true);
          setDisabled(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 배포 이후에 스크롤 생기면 아래 코드 적용
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     let vh = window.innerHeight * 0.01;
  //     document.documentElement.style.setProperty('--vh', `${vh}px`);

  //     return (() => {
  //       window.removeEventListener('resize');
  //     });
  //   })
  // }, []);

  // 사용 방법
  // height: "calc(var(--var, 1vh) * 100)"

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <UserHeader>회원정보 확인</UserHeader>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "24px",
        }}
      >
        <div style={{ padding: "0 16px" }}>
          <div
            style={{
              lineHeight: "35px",
              color: "#75BD62",
              fontWeight: "700",
              fontSize: "24px",
              marginBottom: "40px",
            }}
          >
            안전을 위해 <br />
            회원정보를 확인할게요!
          </div>
          <Input label="비밀번호" type="password" onChangeHandler={passwordChangeHandler} value={password} onFocusHandler={() => {setDisabled(false)}}/>
          <div style={{ position: "absolute", bottom: "40px", width: "calc(100% - 32px)", display: "flex", flexDirection: "column" }}>
            <Button
              buttonSize={ButtonSize.LARGE}
              buttonTheme={
                (pwCheck(password) && !disabled) ? ButtonTheme.GREEN : ButtonTheme.GRAY
              }
              disabled={(!pwCheck(password)) || disabled}
              handler={() => {
                checkPassword(password);
              }}
            >
              회원정보 확인
            </Button>
            {showErrorToast && (<Toast toastTheme={ToastTheme.ERROR}>비밀번호가 일치하지 않습니다.</Toast>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInfo;
