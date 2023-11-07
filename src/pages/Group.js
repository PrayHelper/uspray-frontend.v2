import Header from '../components/Header/Header';
import styled, { css } from "styled-components";

const Group = () => {
  return (
    <GroupWrapper>
      <Header>모임</Header>
      <NoGroupWrapper>
        <div style={{color: "var(--color-dark-green)", fontSize: "28px", fontWeight: "700"}}>참여하신 모임이 없어요.</div>
        <div style={{color: "var(--color-secondary-green)", fontSize: "20px"}}>모임에 참여해서 기도제목을 공유해보세요!</div>
      </NoGroupWrapper>
    </GroupWrapper>
  );
};

export default Group;

const GroupWrapper = styled.div`
  /* padding-top: 65px; */
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: var(--color-light-green);
  color
`;

const NoGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
