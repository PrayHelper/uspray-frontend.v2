
import { useState } from "react";
import { Toggle, ToggleButton, ToggleWrap } from "./style";

const SettingToggle = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  return (
    <ToggleWrap onClick={() => setIsToggleOn(!isToggleOn)}>
      <Toggle isToggleOn={isToggleOn}>
        <ToggleButton isToggleOn={isToggleOn}></ToggleButton>
      </Toggle>
    </ToggleWrap>
  );
};

export default SettingToggle;