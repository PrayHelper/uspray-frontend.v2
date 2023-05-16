import { useNavigate } from "react-router-dom";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import UserHeader from "../components/UserHeader";

const ChangeInfo = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <UserHeader>회원정보 변경</UserHeader>
      <div
        style={{
          width: "100%",
          gap: "24px",
          marginTop: "64px",
        }}
      >
        <div style={{padding: "0 16px", display: "flex", flexDirection: "column", gap: "24px"}}>
          <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GREEN} handler={() => {
            navigate("/changePw");
          }}>
            비밀번호 변경
          </Button>
          <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GREEN}>
            전화번호 변경
          </Button>
          <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GREEN}>
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfo;
