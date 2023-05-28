import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
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


const UserHeader = ({children}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <StyledHeader>
      <BackButton onClick={goBack} src='images/back_button.svg' alt='back_button' />
      <Title>{children}</Title>
    </StyledHeader>
  );
};

export default UserHeader;