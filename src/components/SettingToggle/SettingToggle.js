import { useState } from "react";
import { useNotificationDisable } from "../../hooks/useNotificationDisable";
import { useNotificationEnable } from "../../hooks/useNotificationEnable";
import { Toggle, ToggleButton, ToggleWrap } from "./style";

const SettingToggle = (props) => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const { mutate: mutateNotifyEnable } = useNotificationEnable();
  const { mutate: mutateNotifyDisable } = useNotificationDisable();

  const enableNotify = async () => {
    mutateNotifyEnable(
      { id: props.id },
      {
        onSuccess: (res) => {
          setIsToggleOn(true);
          console.log(res);
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  const disableNotify = async () => {
    mutateNotifyDisable(
      { id: props.id },
      {
        onSuccess: (res) => {
          setIsToggleOn(false);
          console.log(res);
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  return (
    <ToggleWrap onClick={() => (isToggleOn ? disableNotify : enableNotify)}>
      <Toggle isToggleOn={isToggleOn}>
        <ToggleButton isToggleOn={isToggleOn}></ToggleButton>
      </Toggle>
    </ToggleWrap>
  );
};

export default SettingToggle;
