import React, { useEffect, useState } from "react";
import styled from "styled-components";
import serverapi from "../api/serverapi";
import Header from "../components/Header/Header";
import LockerContent from "../components/Locker/LockerContent";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMxNDFkYWNkLTg1NWItNDIyYy04NmIxLWFiZWRlMTQwNTEwOCIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA2LTAyVDE2OjA0OjAyLjAwOTI3OCJ9.CwHk-xJaxr8FWXED1Lq7bd6JjwuO2jed4QlETHrScnk";

const Locker = () => {
  const [data, setData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  const onClickContent = () => {
    setIsClicked(!isClicked);
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
        var data_ = [];
        data_ = res.data;
        setData(data_);
        console.log(data);
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
      <Header>보관함</Header>
      {isEmptyData(data) && (
        <NoDataWrapper>
          <NoDataTitle>공유받은 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>공유받으면 보관함에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      {!isEmptyData(data) && (
        <LockerList>
          {data.map((item) => (
            <div onClick={onClickContent}>
              <LockerContent
                isClicked={isClicked}
                name={item.share_name}
                title={item.title}
                target={item.target}
                dday={item.shared_at}
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
