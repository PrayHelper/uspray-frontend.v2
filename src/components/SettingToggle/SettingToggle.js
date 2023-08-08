import { useState } from "react";
import { useNotificationDisable } from "../../hooks/useNotificationDisable";
import { useNotificationEnable } from "../../hooks/useNotificationEnable";
import { Toggle, ToggleButton, ToggleWrap } from "./style";

const SettingToggle = (props) => {
  const { mutate: mutateNotifyEnable } = useNotificationEnable();
  const { mutate: mutateNotifyDisable } = useNotificationDisable();

  const enableNotify = async () => {
    console.log(props.id);
    mutateNotifyEnable(
      { id: props.id },
      {
        onSuccess: (res) => {
          props.refetchIsNotifiedData();
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
          props.refetchIsNotifiedData();
          console.log(res);
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  return (
    <ToggleWrap
      onClick={() => (props.isAbledData ? disableNotify() : enableNotify())}
    >
      <Toggle isToggleOn={props.isAbledData}>
        <ToggleButton isToggleOn={props.isAbledData}></ToggleButton>
      </Toggle>
    </ToggleWrap>
  );
};

export default SettingToggle;
