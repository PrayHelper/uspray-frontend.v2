import { ToggleButtonStyle } from "./style";

const ToggleButton = ({isErrored, contents, item, setter}) => {

  return (
    <ToggleButtonStyle isErrored={isErrored} isClicked={item == contents} onClick={() => {setter(contents)}}>
      {contents}
    </ToggleButtonStyle>
  );
}

export default ToggleButton;