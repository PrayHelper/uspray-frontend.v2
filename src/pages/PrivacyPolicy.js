import UserHeader from "../components/UserHeader";
import styled from "styled-components";

const TitleTag = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const PrivacyPolicy = () => {
  return (
    <>
      <UserHeader>개인정보 처리 방침</UserHeader>
      
      <div
        style={{ width: "100%", flexDirection: "column", marginTop: "28px", lineHeight: "23px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
            color: "#606060",
          }}
        >
          단체 Uspray(이하 “단체”)는 개인정보보호법, 전자서명법, 정보통신망법,
          정보통신망 이용촉진 및 정보보호 등에 관한 법령에 따라 이용자의
          개인정보를 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수
          있도록 다음과 같은 개인정보 처리방침에 따라 개인정보를 처리하고
          있습니다. 단체가 개인정보 처리방침을 개정하는 경우에는 홈페이지 또는
          Uspray앱에 게시하거나 개별적으로 공지할 것입니다.
          
        </div>
      </div>
      
    </>
  );
};

export default PrivacyPolicy;
