import React, { useEffect, useState } from "react";
import styled from "styled-components";
import serverapi from "../api/serverapi";
import LockerContent from "../components/Locker/LockerContent";
import LockerHeader from "../components/Locker/L_Header";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwOTkwYzRhLTkzY2QtNDUzNi04YWE2LWNkYzhkNTJhNDlkYiIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA2LTA0VDE2OjUxOjU5LjgzOTAyNCJ9.1he_4YhR1YpNFeC7BwYgIQiJ5YsLA7Okx1KXnGTLaB8";

const Locker = () => {
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState([]);

  const calculateDday = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const diffInMilliseconds = today - start;
    return Math.floor(diffInMilliseconds / millisecondsPerDay);
  };

  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  const onClickSelectAll = () => {
    if (isClicked.some((clicked) => clicked)) {
      setIsClicked(isClicked.map(() => false));
    } else {
      setIsClicked(isClicked.map(() => true));
    }
  };

  const onClickContent = (index) => {
    console.log(index);
    const updateClickedList = [...isClicked];
    updateClickedList[index] = !updateClickedList[index];
    setIsClicked(updateClickedList);
  };

  const getSharedPrayList = async () => {
    const api = "/share";
    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (res.status === 200) {
        const data_ = res.data;
        setData(data_);
        console.log(data);
        setIsClicked(new Array(data_.length).fill(false));
        console.log(isClicked);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSharedPrayList();
  }, []);

  return (
    <LockerWrapper>
      <LockerHeader
        isClicked={isClicked.some((clicked) => clicked)}
        onClickSelectAll={onClickSelectAll}
      />
      {isEmptyData(data) && (
        <NoDataWrapper>
          <NoDataTitle>공유받은 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>공유받으면 보관함에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      {!isEmptyData(data) && (
        <LockerList>
          {data.map((item, index) => (
            <div
              style={{ width: "100%" }}
              onClick={() => onClickContent(index)}
            >
              <LockerContent
                isClicked={isClicked[index]}
                name={item.share_name}
                title={item.title}
                target={item.target}
                dday={calculateDday(item.shared_at)}
                key={item.pray_id}
              />
            </div>
          ))}
        </LockerList>
      )}
    </LockerWrapper>
  );
};

export default Locker;

const LockerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const NoDataWrapper = styled.div`
  background-color: #d0e8cb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const NoDataTitle = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 41px;
  color: #7bab6e;
`;
const NoDataContent = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #b3d1ab;
`;

const LockerList = styled.div`
  padding-top: 6px;
  background-color: #d0e8cb;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: auto;
`;
