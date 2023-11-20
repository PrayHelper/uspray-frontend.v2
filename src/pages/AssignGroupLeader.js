import React from 'react';
import UserHeader from '../components/UserHeader';
import styled from 'styled-components';
import Button, {ButtonSize, ButtonTheme} from '../components/Button/Button';
import { useState } from 'react';
import Search from '../components/AssignGroupLeader/Search';
import SearchList from '../components/AssignGroupLeader/SearchList';

const AssignGroupLeader = () => {
  const [leader, setLeader] = useState("");
  const [searchName, setSearchName] = useState("");
  const data = ['김은혜', '권은혜', '박은혜', '이은혜', '허은혜', '허그레이스', '권은혜', '박은혜', '이은혜'];

  return (
    <Wrapper>
      <UserHeader>모임 리더 맡기기</UserHeader>
      <ContentWrapper>
        <div style={{display: "flex", flexDirection: "column", height: '100%'}}>
          <Search
            topText={"\"모임 리더 맡기기\"를 누르시면 모임리더 권한이 모두 위임되며, 나는 멤버로 변경됩니다."}
            setSearchName={setSearchName}
          />
          <SearchList data={data} searchName={searchName} leader={leader} setLeader={setLeader}/>
          <BottomButtonWrapper>
            <Button
              disabled={leader === ""}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={leader ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              isArrow={true}
              onClick={() => {

              }}
            >
              모임 리더 맡기기
            </Button>
          </BottomButtonWrapper>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`

const ContentWrapper = styled.div`
  width: 100%;
  gap: 24px;
  margin-top: 24px;
  flex: 1;
  overflow: hidden;
`

const BottomButtonWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`

export default AssignGroupLeader;