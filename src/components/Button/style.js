import styled from 'styled-components';
import Button, { ButtonSize, ButtonTheme } from './Button';

export const BaseButtonStyle = styled.button`
  width: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "55px" : "100%"};
  height: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "33px" : "63px"};
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "center": "space-between"};
  align-items: center;
  padding: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "0px": "20px 26px 20px 16px"};
  font-size: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "12px": "16px"};
  border-radius: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "4px": "16px"};
  border-style: none;
  background-color: ${props => (props.buttonTheme == ButtonTheme.GREEN) ? "#7BAB6E" : "#EEEEEE"};
  color: ${props => (props.buttonTheme == ButtonTheme.GREEN) ? "#FFFFFF" : "#A0A0A0"};
  line-height: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "17px" : "23px"};
  font-weight: 700;
`