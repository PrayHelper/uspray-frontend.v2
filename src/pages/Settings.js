import Header from "../components/Header/Header";
import styled from 'styled-components';
import { Link } from "react-router-dom";

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
  gap: 16px;
`;  

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333333;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Settings = () => {
  return(
    <Container>
      <Header>설정</Header>
      <Wrapper style={{marginTop: "10px"}}>
        <WhiteBox style={{paddingTop:"-10px"}}>
          <SubTitle>계정</SubTitle>
          <StyledLink to="/checkInfo">
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <div>회원정보 변경</div>
              <img src="images/ic_next_arrow.svg" alt="next_arrow_icon" />
            </div>
          </StyledLink>
          <div>로그아웃</div>
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
