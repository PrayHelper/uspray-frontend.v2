import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 65px;

    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    `

const Title = styled.div`

  margin-left: 16px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
`

const LockerUserHeader = () => {
    return (
        <StyledHeader>
          <Title>보관함</Title>
        </StyledHeader>
    );
  };

export default LockerUserHeader;