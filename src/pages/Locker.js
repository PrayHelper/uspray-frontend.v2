import React, { useEffect, useState } from "react";
import LockerHeader from "../Locker_components/L_Header";
import PrayChecker from "../Locker_components/L_PrayChecker";

const data = [
  {id:1, checked: "unchecked", name: "김동하", prayer: 'hello', dday: 'd-7'},
  {id:2, checked: "unchecked", name: "김동하", prayer: 'hello', dday: 'd-7'},
  {id:3, checked: "unchecked", name: "김동하", prayer: 'hello', dday: 'd-7'},
  {id:4, checked: "unchecked", name: "김동하", prayer: 'hello', dday: 'd-7'},
  {id:5, checked: "unchecked", name: "김동하", prayer: 'hello', dday: 'd-7'},
  {id:6, checked: "unchecked", name: "김동하", prayer: 'hello', dday: 'd-7'}
]
const Locker = () => {
  return (
  <div 
  style={{ 
      backgroundColor: "#d0e8cb",
      width : "430px"
      }}>
    <LockerHeader/>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "27px",
        padding: "20px 27px",
      }}
    >
      <div>
        {data.map((item) => (
          <PrayChecker key={item.id} checked={item.checked} name={item.name} prayer={item.prayer} dday={item.dday}/>
        ))}
      </div>
    </div>
  </div>
);
};

export default Locker;