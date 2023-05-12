import styled from "styled-components";
import { ReactComponent as NextArrow } from "../../../images/next_arrow.svg";

// backgoround, context, color, borderColor 요소 받아오기

const Button = (props) => {
  return (
    <BottomBtn borderColor={props.borderColor} backgrond={props.backgrond}>
      <BottomBtnFont color={props.color}>{props.context}</BottomBtnFont>
      <NextArrow fill={props.arrowColor} style={{ paddingRight: "12px" }} />
    </BottomBtn>
  );
};

export default Button;

const BottomBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 63px;
  border-radius: 16px;
  background-color: ${(props) => props.backgrond};
  padding: 0 16px;
  margin: 0px 24px 12px 24px;
  border: ${(props) => `1px solid ${props.borderColor}` || "none"};
  cursor: pointer;
`;

const BottomBtnFont = styled.div`
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 700;
`;
