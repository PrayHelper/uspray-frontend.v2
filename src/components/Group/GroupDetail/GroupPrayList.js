import React from 'react';
import styled from 'styled-components';

const GroupPrayList = ({isData}) => {
  return (
    <Wrapper>
      {
        isData ?
          <div></div>
          :
          <NoDataWrapper>
            <div>북동1팀 모임원에게</div>
            <div>기도제목을 공유해보세요.</div>
          </NoDataWrapper>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: 16px;
  letter-spacing: -0.04em;
`;

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--color-secondary-grey);
  font-size: 24px;
  font-weight: 700;
`;

export default GroupPrayList;