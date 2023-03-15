import { ToggleButtonStyle } from "./style";

const ToggleButton = ({contents, item, setter}) => {

  return (
    <ToggleButtonStyle isClicked={item == contents} onClick={() => {setter(contents)}}>
      {contents}
    </ToggleButtonStyle>
  );
}

export default ToggleButton;