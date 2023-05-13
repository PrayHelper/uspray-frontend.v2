import Header from "../components/Header/Header";
import styled from "styled-components";
import HisContent from "../components/History/HisContent";
import serverapi from "../api/serverapi";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const History = () => {
  const [isOnDate, setIsOnDate] = useState(true);
  const [isOnPray, setIsOnPray] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const [ref, inView] = useInView();

  const accessToken = "";

  const onClickDate = () => {
    setIsOnDate(true);
    setIsOnPray(false);
  };
  const onClickPray = () => {
    setIsOnDate(false);
    setIsOnPray(true);
  };

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    const api = `/history`;
    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `${accessToken}`,
        },
        params: {
          page: page,
          per_page: 15,
        },
      });
      if (res.status === 200) {
        console.log(res.data.res);
        setData((prev) => [...prev, ...res.data.res]);
        setLoading(false);
      }
    } catch (e) {
      console.log(e.response);
    }
  }, [page]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, loading]);

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
      {data.map((el) => (
        <>
          <HisContent
            name={el.target}
            content={el.title}
            date={`${el.created_at.split(" ")[0]} ~ ${el.deadline}`}
          />
          <div ref={ref}></div>
        </>
      ))}
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
