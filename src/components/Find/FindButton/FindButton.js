import { BaseButtonStyle } from "./style";
import styled from 'styled-components';
import { ReactComponent as NextArrow} from "../../../images/next_arrow.svg";

const NextArrowStyle = styled.div`
  display: ${props => (props.buttonSize == ButtonSize.LARGE) ? "block" : "none"};
  marign-right: 10px;
`

export const ButtonSize = {
  NORMAL: 0,
  LARGE: 1,
};

export const ButtonTheme = {
  GREEN: 0,
  GRAY: 1,
  RED: 2,
};

Object.freeze(ButtonSize);
Object.freeze(ButtonTheme);

const FindButton = ({buttonSize, buttonTheme, disabled, handler ,children}) =>{
  if (!buttonSize) {
    buttonSize = ButtonSize.NORMAL;
  }
  if (!buttonTheme) {
    buttonTheme = ButtonTheme.GREEN;
  }

  return <BaseButtonStyle buttonSize={buttonSize} buttonTheme={buttonTheme} disabled={disabled} onClick={handler}>
    {children}
    <NextArrowStyle buttonSize={buttonSize} buttonTheme={buttonTheme}>
      <NextArrow fill={buttonTheme == ButtonTheme.GREEN ? "#FFFFFF" : "#7BAB6E"} />
    </NextArrowStyle>
    </BaseButtonStyle>
};

export default FindButton;