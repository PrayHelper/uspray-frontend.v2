import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";
import LoginButton from "../components/Login/LoginButton/LoginButton";
import UserHeader from "../components/UserHeader";
import styled from 'styled-components';
import serverapi from "../api/serverapi";

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  gap: 8px;
  border-radius: 16px;
  padding: 16px;
  color: #FF6B6B;
  z-index: 500;
`;

const ModalButton1 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #F0F0F0;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #808080;
  font-size: 18px;
`;

const ModalButton2 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  background-color: #FF6B6B;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #FFFFFF;
  font-size: 18px;
`;

const ChangeInfo = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  
  const handleCloseModal = () =>{
    setShowModal(false);
  };

  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwOTkwYzRhLTkzY2QtNDUzNi04YWE2LWNkYzhkNTJhNDlkYiIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE5VDE2OjEwOjAxLjY5NzY4OSJ9.ZSFK5Haqqj3MpY1p6-4eD-8nCy-TyuaSZ5lwo3Ouxcc";

  const withdrawal = async () => {
    const api = "/user/withdrawal";
    try {
      const res = await serverapi.delete(api,{
        headers: {
          Authorization: `${accessToken}`,
        }
      });
      if (res.status === 200) {
        window.location.href = '/';
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src="images/ic_withdrawal.svg" alt="withdrawal_icon" style={{marginTop: "8px"}}/>
            <div
              style={{
                fontSize: "24px",
                color: "#FF6B6B",
                fontWeight: "700",
                paddingBottom: "2px",
              }}
            >
              회원탈퇴 하시겠습니까?
            </div>
            <div
              style={{
                fontSize: "18px",
                marginTop: "2px",
                marginBottom: "26px",
              }}
            >
             신중하게 결정해주세요!
            </div>
            <div style={{display: "flex", flexDirection: "row", width: "100%", gap: "8px"}}>
              <ModalButton1 onClick={handleCloseModal}>
                취소
              </ModalButton1>
              <ModalButton2 onClick={withdrawal}>
                회원탈퇴
              </ModalButton2>
            </div>
          </ModalContent>
        </>
        )}
      <UserHeader>회원정보 변경</UserHeader>
      <div
        style={{
          width: "100%",
          gap: "24px",
          marginTop: "64px",
        }}
      >
        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.GREEN}
            handler={() => {
              navigate("/changePw");
            }}
          >
            비밀번호 변경
          </Button>
          <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GREEN}  handler={() => {
              navigate("/changePhoneNumber");
            }}>
            전화번호 변경
          </Button>
          <LoginButton
            backgrond={"#ffffff"}
            context={"회원탈퇴"}
            color={"#7bab6e"}
            borderColor={"#7bab6e"}
            arrowColor={"#7bab6e"}
            handler={() => {setShowModal(true)}}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeInfo;
