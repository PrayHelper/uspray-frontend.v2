import React from 'react';
import styled from 'styled-components';

const BackgroundStyle = styled.body`
  background-color: #d0e8cb;
  margin: 0;
  padding: 0;
`;

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;

    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    `

const Title = styled.div`
  margin: 0 auto;
  font-weight: bold;
`

const LightGreenUserHeader = () => {
    return (
      <>
        <BackgroundStyle />
        <StyledHeader>
          <Title>보관함</Title>
        </StyledHeader>
      </>
    );
  };

export default LightGreenUserHeader;