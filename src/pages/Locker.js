import React, { useEffect, useState } from "react";
import LockerHeader from "../components/Locker/L_Header";
import PrayChecker from "../components/Locker/L_PrayChecker";
import serverapi from "../api/serverapi";

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNzI5NzQ4LTk3OTQtNGRjMC05NDk3LTY5MWEwMzk3N2Y5ZiIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE4VDE1OjE5OjQ2LjM4Njc1NSJ9.o6fGb8W8dcxc9PTP5NTjB4JowayBPASaBDMP_dYkXvI"


const Locker = () => {
  const [data , setData] = useState([]);
  const getSharedPrayList = async () => {
    const api = "/share";
    try {
      const res= await serverapi.get(api, { headers: {
        'Authorization': `${accessToken}`}});
      if (res.status === 200) {
        var data_ = [];
        data_ = res.data;
        setData(data_);
        console.log(data);
      }
    } catch (e){
      console.log(e);
    }
  };
  useEffect(() => {
    getSharedPrayList();
  }, []);

  return (
  <div 
  style={{ 
      backgroundColor: "#d0e8cb",
      width : "430px",
      height : "100%"
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
          <PrayChecker name={item.share_name} title={item.title} dday={item.shared_at} key={item.pray_id}/>
        ))}
      </div>
    </div>
  </div>
);
};

export default Locker;