import Header from "../components/Header/Header";
import styled from 'styled-components';
import { useState } from "react";
import SettingToggle from "../components/SettingToggle/SettingToggle";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { useNavigate } from "react-router-dom";

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
  padding: 24px 0;
  color: #A0A0A0;
  background-color: white;
`;  

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
  padding-left: 16px;
  color: #333333;
`;

const StyledItem = styled.div`
  transition: all 0.3s;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: white;

  &:active{
    transition: all 0.2s; 
    ${props => props.noActive ?
      `filter: brightness(1);
        transform: scale(1);`
      :
      `filter: brightness(0.95);
        transform: scale(0.98);`
    }
  }
`;

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
  color: #7bab6e;
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
  background-color: #7BAB6E;
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: #FFFFFF;
  font-size: 18px;
`;


const Settings = () => {

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModalHandler = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () =>{
    setShowModal(false);
  };

  const movePageHandler = () => {
    navigate('/checkInfo');
  };

  const logout = () => {
    console.log('로그아웃 기능 구현해라~');
  };

  const moveToKakao = () => {
    window.open('https://pf.kakao.com/_UgxhYxj');
  };

  const moveToInsta = () => {
    window.open('https://www.instagram.com/_uspray/');
  };

  const moveToToS = () => {
    navigate('/tos');
  };

  const moveToPrivacyPolicy = () => {
    navigate('/privacyPolicy');
  };



  return(
    <Container>
      {showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={handleCloseModal} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <img src="images/ic_logout.svg" alt="icon_logout" style={{marginTop: "8px"}}/>
            <div
              style={{
                fontSize: "20px",
                color: "#7BAB6E",
                fontWeight: "700",
                paddingBottom: "2px",
              }}
            >
              로그아웃 하시겠습니까?
            </div>
            <div
              style={{
                marginTop: "2px",
                marginBottom: "28px",
              }}
            >
              보다 안전하게 로그아웃을 진행해 드릴게요.
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
        </>
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
          <StyledItem noActive={true}>
            <div>기도 시간 - 오전 8시</div>
            <SettingToggle></SettingToggle>
          </StyledItem>
          <StyledItem noActive={true}>
            <div>다른 사람이 내 기도 제목을 기도 했을 때</div>
            <SettingToggle></SettingToggle>
          </StyledItem>
          <StyledItem noActive={true}>
            <div>다른 사람이 내 기도 제목을 공유 받았을 때</div>
            <SettingToggle></SettingToggle>
          </StyledItem>
        </WhiteBox>
        <WhiteBox>
          <SubTitle>문의</SubTitle>
          <StyledItem onClick={moveToKakao}>
            <div>카카오톡으로 문의</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>
          <StyledItem onClick={moveToInsta}>
            <div>인스타그램으로 문의</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>      
        </WhiteBox>
        <WhiteBox>
          <SubTitle>서비스 정보</SubTitle>
          <StyledItem onClick={moveToToS}>
            <div>이용 약관 및 정책</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>  
          <StyledItem onClick={moveToPrivacyPolicy}>
            <div>개인정보 처리 방침</div>
            <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
          </StyledItem>  
          <StyledItem noActive={true}>
            <div>현재 서비스 버전 확인</div>
            <div style={{color: "#7BAB6E", fontWeight: "700", fontSize: "15px"}}>0.1.2</div>
          </StyledItem>  
        </WhiteBox>
      </Wrapper>
    </Container>
  );
};

export default Settings;