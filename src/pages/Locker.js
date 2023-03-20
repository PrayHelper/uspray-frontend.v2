import ToggleButton from "../components/ToggleButton";
import React, { useEffect, useState } from "react";
import LightGreenUserHeader from "../components/LightGreenUserHeader";
import Button, { ButtonSize, ButtonTheme } from "../components/Button/Button";

const Locker = () => {
  const [gender, setGender] = useState("");

  return (
    <div>
      <LightGreenUserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
          backgroundColor: "#D0E8CB;"
        }}
      >
        <Button buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GRAY}>비활성화 버튼</Button>
      </div>
    </div>
  );
};

export default Locker;
