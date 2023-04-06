import { useState } from "react";
import styled from "styled-components";

// label, 요소 받아오기

const Input2 = (props) => {
  return (
    <Wrapper>
      <WrapperStyle>
        <LabelStyle>{props.labelName}</LabelStyle>
        <InputStyle value={props.idValue} type="text" readOnly />
      </WrapperStyle>
    </Wrapper>
  );
};

export default Input2;

const Wrapper = styled.div`
  margin-bottom: 25px;
  display: flex;
  align-items: center;
`;

const WrapperStyle = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #7bab6e;
  margin: -1px;
  border-radius: 15px;
`;

export const LabelStyle = styled.span`
  position: absolute;
  top: 0px;
  left: 9px;
  transform: translateY(-50%);

  font-size: 12px;
  color: #7bab6e;
  padding: 0px 5px;
  z-index: 0;

  background-color: white;
  transition: 0.2s;
`;

const InputStyle = styled.input`
  width: 100%;
  border: none;
  background: none;
  font-size: 16px;
  color: #7bab6e;
  &:focus {
    outline: none;
  }
  padding: 16px 16px;
`;
