import ToggleButton from "../components/ToggleButton";
import React, { useEffect, useState } from "react";
import LockerUserHeader from "../Locker_components/LockerUserHeader";
import CheckButton, { ButtonSize, ButtonTheme } from "../Locker_components/CheckButton/CheckButton";


const Locker = () => {
  return (
    <div style={{ backgroundColor: "#d0e8cb" }}>
      <LockerUserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
        }}
      >
        <CheckButton buttonSize={ButtonSize.LARGE} buttonTheme={ButtonTheme.GRAY}>비활성화 버튼</CheckButton>
      </div>
    </div>
  );
};

export default Locker;
