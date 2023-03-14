import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`

const BackButton = styled.img`
  position: absolute;
  margin-left: 15px;
`
const Title = styled.div`
  margin: 0 auto;
  color: #7BAB6E;
  font-weight: bold;
`


const UserHeader = () => {
  return (
    <StyledHeader>
      <BackButton src='images/back_button.svg' alt='back_button' />
      <Title>회원가입</Title>
    </StyledHeader>
  );
};

export default UserHeader;