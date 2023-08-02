import styled from "styled-components";
import { ReactComponent as NextArrow } from "../../../images/next_arrow.svg";

// background, context, color, borderColor 요소 받아오기

const LoginButton = (props) => {
  return (
    <BottomBtn
      borderColor={props.borderColor}
      background={props.background}
      margin={props.margin}
      onClick={props.handler}
    >
      <BottomBtnFont color={props.color}>{props.context}</BottomBtnFont>
      <NextArrow fill={props.arrowColor} />
    </BottomBtn>
  );
};

export default LoginButton;

const BottomBtn = styled.div`
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${(props) => props.background};
  padding: 20px 24px 20px 16px;
  margin: ${(props) => props.margin};
  border: ${(props) => `1px solid ${props.borderColor}` || "none"};
  cursor: pointer;
  box-sizing: border-box;

  &:active {
    transition: all 0.2s ease-in-out;
    scale: 0.98;
    filter: brightness(0.9);
  }
`;

const BottomBtnFont = styled.div`
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 500;
`;
