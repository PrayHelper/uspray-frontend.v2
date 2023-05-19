import Header from "../components/Header/Header";
import styled from "styled-components";
import HisContent from "../components/History/HisContent";
import { useState } from "react";

const History = () => {
  const [isOnDate, setIsOnDate] = useState(true);
  const [isOnPray, setIsOnPray] = useState(false);

  const onClickDate = () => {
    setIsOnDate(true);
    setIsOnPray(false);
  };
  const onClickPray = () => {
    setIsOnDate(false);
    setIsOnPray(true);
  };

  return (
    <HistoryWrapper>
      <Header>히스토리</Header>
      <ToggleWrapper>
        <ToggleButton>
          <ToggleText isOnDate={isOnDate} onClick={onClickDate}>
            날짜순
          </ToggleText>
          <ToggleText isOnPray={isOnPray} onClick={onClickPray}>
            기도순
          </ToggleText>
        </ToggleButton>
      </ToggleWrapper>
      <Hline />
      <HisContent
        name={"문재영"}
        content={
          "피고, 심장의 끝까지 스며들어 날카로우나 동산은 것이다. 같은 온갖 거친 바이며, 청춘의 놀이 피어나기 것이다. 대한 같이 능히 그러므로 우리 운다."
        }
        date={"2023/03/01 ~ 2023/03/03"}
      />
      <HisContent
        name={"이종우"}
        content={"열락의 있는 가슴이 동산에는 피고 희망의 능히 새 부패뿐이다."}
        date={"2023/03/03 ~ 2023/03/05"}
      />
    </HistoryWrapper>
  );
};

export default History;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const Hline = styled.hr`
  width: 100%;
  color: "#CECECE";
  size: 1px;
  opacity: 0.5;
  margin: 0;
`;

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const ToggleButton = styled.div`
  margin: 20px 16px 16px 0px;
  background: #7bab6e;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  padding: 4px;
`;

const ToggleText = styled.div`
  font-weight: 700;
  font-size: 10px;
  border-radius: 2px;
  color: ${(props) =>
    props.isOnDate || props.isOnPray ? "#7BAB6E" : "#ebf7e8"};
  padding: 6px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isOnDate || props.isOnPray ? "#EBF7E8" : "none"};
  /* background-color: #ebf7e8; */
`;
