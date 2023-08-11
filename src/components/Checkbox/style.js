import styled from "styled-components";
import IcGrayCheck from "../../images/ic_gray_check.svg";
import { Link } from "react-router-dom";

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100vw - 64px);
`;

export const CheckboxStyle = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #cecece;
  border-radius: 3px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${IcGrayCheck});
  background-size: 0px 0px;
  background-repeat: no-repeat;
  background-position: 50%;
  flex-shrink: 0;
  margin-right: 8px;

  &:checked {
    transition: all 0.2s;
    border-color: transparent;
    background-size: 10px 7px;
    background-color: #cecece;
  }
`;

export const StyledLinkLabel = styled(Link)`
  color: #a0a0a0;
  font-size: 14px;
  text-decoration: underline;
`;

export const StyledLabel = styled.div`
  color: #a0a0a0;
  font-size: 14px;
`;
