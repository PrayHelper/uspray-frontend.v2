import React, { useEffect, useState } from "react";
import LockerUserHeader from "../Locker_components/LockerUserHeader";

import PrayChecker from "../Locker_components/L_PrayChecker";


const Locker = () => {
    return (
    <div 
    style={{ 
        backgroundColor: "#d0e8cb",
        width : "430px"
        }}>
      <LockerUserHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "27px",
          padding: "20px 27px",
        }}
      >
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
        <PrayChecker name='김동하' prayer='hello' dday='D-7'/>
      </div>
    </div>
  );
};

export default Locker;