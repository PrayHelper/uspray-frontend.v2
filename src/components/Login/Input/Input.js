import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as NextArrow } from "../../../images/next_arrow.svg";

// label, 요소 받아오기

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocusInput = () => {
    setIsFocused(true);
  };
  const onBlurInput = () => {
    setIsFocused(false);
  };

  return (
    <Wrapper>
      <WrapperStyle isFocused={isFocused}>
        <LabelStyle isFocused={isFocused}>{props.labelName}</LabelStyle>
        <InputStyle
          onChange={props.onChangeId}
          onFocus={onFocusInput}
          type="text"
          onBlur={onBlurInput}
        />
      </WrapperStyle>
      <Link to={props.nextRouter}>
        <SubmitInputBtn isFocused={isFocused}>
          <NextArrow fill="white" />
        </SubmitInputBtn>
      </Link>
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
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
  border: ${(props) => (props.isFocused ? "2px" : "1px")} solid
    ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
  margin: ${(props) => (props.isFocused ? "-1px" : "0px")};
  border-radius: 15px 0px 0px 15px;
`;

export const LabelStyle = styled.span`
  position: absolute;
  top: ${(props) => (props.isFocused ? "0px" : "50%")};
  left: 9px;
  transform: translateY(-50%);

  font-size: ${(props) => (props.isFocused ? "12px" : "16px")};
  color: ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
  padding: 0px 5px;
  z-index: ${(props) => (props.isFocused ? "0" : "-1")};

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

const SubmitInputBtn = styled.div`
  background: #7bab6e;
  height: 100%;
  padding: 20px 28px;
  cursor: pointer;
  border-radius: 0px 15px 15px 0px;
  border: ${(props) => (props.isFocused ? "1px" : "0px")} solid
    ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
  margin: ${(props) => (props.isFocused ? "-1px" : "0px")};
`;
