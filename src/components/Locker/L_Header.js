import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GrayCheck } from "../../images/ic_gray_check.svg";

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

const LockerHeader = () => {
    return (
        <StyledHeader>
          <Title>보관함</Title>
          <div>
            <button><GrayCheck/>전체선택</button>
          </div>
        </StyledHeader>
    );
  };

export default LockerHeader;