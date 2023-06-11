import styled from "styled-components";
import { ReactComponent as NextArrow } from "../../../images/next_arrow.svg";

// background, context, color, borderColor 요소 받아오기

const LoginButton = (props) => {
  return (
    <BottomBtn
      borderColor={props.borderColor}
      backgrond={props.backgrond}
      margin={props.margin}
      onClick={props.handler}
    >
      <BottomBtnFont color={props.color}>{props.context}</BottomBtnFont>
      <NextArrow fill={props.arrowColor} style={{ paddingRight: "10px" }} />
    </BottomBtn>
  );
};

export default LoginButton;

const BottomBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 63px;
  border-radius: 16px;
  background-color: ${(props) => props.backgrond};
  padding: 0 16px;
  margin: ${(props) => props.margin};
  border: ${(props) => `1px solid ${props.borderColor}` || "none"};
  cursor: pointer;
  box-sizing: border-box;
`;

const BottomBtnFont = styled.div`
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 500;
`;
