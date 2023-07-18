import styled from 'styled-components';
import { ButtonSize, ButtonTheme } from './Button';

export const BaseButtonStyle = styled.button`
  transition: all 0.2s;
  width: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "55px" : "100%"};
  height: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "33px" : ""};
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "center": "space-between"};
  align-items: center;
  padding: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "0px": "20px 26px 20px 16px"};
  font-size: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "12px": "16px"};
  border-radius: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "4px": "16px"};
  background-color: ${props => {
    let backgroundColor;
    switch (props.buttonTheme) {
      case ButtonTheme.GREEN:
        backgroundColor = props.disabled ? "#D0E8CB" : "#7BAB6E";
        break;
      case ButtonTheme.RED:
        backgroundColor = "#FF6B6B";
        break;
      case ButtonTheme.WHITE:
        backgroundColor = "#FFFFFF";
        break;
      default:
        backgroundColor = "#EEEEEE";
        break;
    }
    return backgroundColor;
  }};
  
  border: ${props => (props.buttonTheme === ButtonTheme.WHITE) ? "1px solid #7BAB6E": "none"};
  color: ${props => {
    let color;
    switch (props.buttonTheme) {
      case ButtonTheme.GREEN:
      case ButtonTheme.RED:
        color = "#FFFFFF";
        break;
      case ButtonTheme.WHITE:
        color = "#7BAB6E";
        break;
      default:
        color = "#A0A0A0";
        break;
    }
    return color;
  }};
  margin: ${props => (props.buttonTheme === ButtonTheme.WHITE) ? "-1px": "0px"};
  
  line-height: ${props => (props.buttonSize == ButtonSize.NORMAL) ? "17px" : "23px"};
  font-weight: 500;
`
