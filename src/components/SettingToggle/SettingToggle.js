
import { useState } from "react";
import { Toggle, ToggleButton, ToggleWrap } from "./style";

const SettingToggle = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  return (
    <ToggleWrap>
      <Toggle isToggleOn={isToggleOn}>
        <ToggleButton isToggleOn={isToggleOn} onClick={() => setIsToggleOn(!isToggleOn)}></ToggleButton>
      </Toggle>
    </ToggleWrap>
  );
};

export default SettingToggle;