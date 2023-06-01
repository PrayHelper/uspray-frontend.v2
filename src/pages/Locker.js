import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import LockerHeader from "../components/Locker/L_Header";
import PrayChecker from "../components/Locker/L_PrayChecker";
import serverapi from "../api/serverapi";
import Header from "../components/Header/Header";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkNzI5NzQ4LTk3OTQtNGRjMC05NDk3LTY5MWEwMzk3N2Y5ZiIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE4VDE1OjE5OjQ2LjM4Njc1NSJ9.o6fGb8W8dcxc9PTP5NTjB4JowayBPASaBDMP_dYkXvI";

const Locker = () => {
  const [data, setData] = useState([1]);

  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };
  // const getSharedPrayList = async () => {
  //   const api = "/share";
  //   try {
  //     const res= await serverapi.get(api, { headers: {
  //       'Authorization': `${accessToken}`}});
  //     if (res.status === 200) {
  //       var data_ = [];
  //       data_ = res.data;
  //       setData(data_);
  //       console.log(data);
  //     }
  //   } catch (e){
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   getSharedPrayList();
  // }, []);
  /* <div>
          {data.map((item) => (
            <PrayChecker
              name={item.share_name}
              title={item.title}
              dday={item.shared_at}
              key={item.pray_id}
            />
          ))}
        </div> */
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
          <LockerContent>
            <TopContentWrapper>
              <Name>이종우</Name>
              <NameNDate>배서현, D+3</NameNDate>
            </TopContentWrapper>
            <Content>
              안녕할 수 있도록 두 세 줄짜리는 어떻게 되느냐가 궁금하다
              하셔가지고 이렇게 두 줄짜리를 만들어 보았씁니다. 근데 세 줄짜리가
              더 좋아서 세줄로 함.
            </Content>
          </LockerContent>
          <LockerContent>
            <TopContentWrapper>
              <Name>이종우</Name>
              <NameNDate>배서현, D+3</NameNDate>
            </TopContentWrapper>
            <Content>한줄짜리입니다</Content>
          </LockerContent>
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
`;

const LockerContent = styled.div`
  padding: 16px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(49, 65, 44, 0.25);
  border-radius: 16px;
  margin: 6px 24px;
  width: calc(100% - 64px);
`;

const TopContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;

const Name = styled.div`
  color: #7bab6f;
  font-size: 12px;
  /* line-height: 17px; */
`;

const NameNDate = styled.div`
  color: #a0a0a0;
  font-size: 12px;
`;

const Content = styled.div`
  color: #606060;
  font-size: 12px;
  line-height: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
