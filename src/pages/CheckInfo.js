import UserHeader from "../components/UserHeader";
import Input from "../components/Input/Input";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import { useEffect, useState } from "react";

const CheckInfo = () => {
  const [password, setPassword] = useState("");

  const checkPassword = async (password) => {};

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
          <Input label="비밀번호" value={password} />
          <div style={{ position: "absolute", bottom: "40px", width: "calc(100% - 32px)", display: "flex", flexDirection: "column" }}>
            <Button
              buttonSize={ButtonSize.LARGE}
              buttonTheme={
                checkPassword(password) ? ButtonTheme.GREEN : ButtonTheme.GRAY
              }
              disabled={!checkPassword(password)}
              handler={() => {}}
            >
              회원정보 확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInfo;
