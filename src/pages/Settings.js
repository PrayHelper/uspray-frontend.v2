import Header from "../components/Header/Header";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: #F0F0F0;
`;

const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  color: #A0A0A0;
  background-color: white;
`;  

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #333333;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
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

const ModalButton1 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  height: 66px;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 20px 0;
  color: #ffffff;
  font-size: 18px;
`;

const ModalButton2 = styled.button`
  flex-grow: 1;
  flex-basis: 0;
  height: 66px;
  background-color: #D0E8CB;
  border-style: none;
  border-radius: 16px;
  padding: 20px 0;
  color: #7BAB6E;
  font-size: 18px;
`;


const Settings = () => {

  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () =>{
    setShowModal(false);
  };

  const movePageHandler = () => {
    window.location.href= '/checkInfo';
  }

  const logout = () => {
    console.log('로그아웃 기능 구현해라~');
  }

  return(
    <Container>
      {showModal && (
        <ModalWrapper onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src="images/ic_logout.svg" alt="icon_logout" style={{marginTop: "8px"}}/>
            <div
              style={{
                fontSize: "20px",
                color: "#7BAB6E",
                fontWeight: "700",
                marginTop: "8px",
                marginBottom: "40px",
              }}
            >
              로그아웃 하시겠습니까?
            </div>
            <div style={{display: "flex", flexDirection: "row", width: "100%", gap: "8px"}}>
              <ModalButton1 onClick={handleCloseModal}>
                취소
              </ModalButton1>
              <ModalButton2 onClick={logout}>
                로그아웃
              </ModalButton2>
            </div>
          </ModalContent>
        </ModalWrapper>
        )}
      <Header>설정</Header>
      <Wrapper style={{marginTop: "10px"}}>
        <WhiteBox style={{paddingTop:"-10px"}}>
          <SubTitle>계정</SubTitle>
          <StyledItem onClick={movePageHandler}>
            <div>회원정보 변경</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
          <StyledItem onClick={openModalHandler}>
            <div>로그아웃</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
        </WhiteBox>
        <WhiteBox>
          <SubTitle>알림</SubTitle>
          <div>공지사항</div>
          <div>기도 시간(오전 8시)</div>
          <div>다른 사람이 내 기도 제목을 기도 했을 때</div>
          <div>다른 사람이 내 기도 제목을 공유 받았을 때</div>
        </WhiteBox>
        <WhiteBox>
          <SubTitle>문의</SubTitle>
          <div>카카오톡으로 문의</div>
          <div>인스타그램으로 문의</div>
        </WhiteBox>
        <WhiteBox>
          <SubTitle>서비스 정보</SubTitle>
          <div>이용 약관 및 정책</div>
          <div>개인정보 처리 방침</div>
          <div>현재 서비스 버전 확인</div>
        </WhiteBox>
      </Wrapper>
    </Container>
  );
};

export default Settings;
