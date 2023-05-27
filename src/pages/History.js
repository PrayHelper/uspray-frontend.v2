import Header from "../components/Header/Header";
import styled, { css } from "styled-components";
import HisContent from "../components/History/HisContent";
import serverapi from "../api/serverapi";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Toast, { ToastTheme } from "../components/Toast/Toast";

const History = () => {
  const [isOnDate, setIsOnDate] = useState(true);
  const [isOnPray, setIsOnPray] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [currentId, setCurrentId] = useState();
  const [updateDate, setUpdateDate] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true, // 한 번만 트리거되도록 설정
  });

  const accessToken = "";

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const onClickUpdateDate = (days) => {
    const today = new Date();
    const targetDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
    const dd = String(targetDate.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setUpdateDate(formattedDate);
    setSelectedBtn(days); // css 변경용
  };

  const onChangeDatePicker = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`; // 포맷된 날짜 생성
    setUpdateDate(formattedDate); // formattedDate를 업데이트
    setShowDatePicker(false); // DatePicker 닫기
  };

  const handleButtonClick = () => {
    setShowDatePicker(true);
    setSelectedBtn(0);
  };

  const onClickDate = () => {
    if (isOnDate) return; // 이미 선택된 버튼이면 함수 종료
    setIsOnDate(true);
    setIsOnPray(false);
    setPage(1);
    setHasMore(true);
    setData([]);
  };

  const onClickPray = () => {
    if (isOnPray) return; // 이미 선택된 버튼이면 함수 종료
    setIsOnDate(false);
    setIsOnPray(true);
    setPage(1);
    setHasMore(true);
    setData([]);
  };

  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  const onClickExitModal = () => {
    setShowModal(false);
    setShowSubModal(false);
  };

  const onClickSubModal = () => {
    setShowSubModal(!showSubModal);
  };

  const onClickModify = async (id, newDeadline) => {
    const api = `/history/modify`;
    const data = {
      pray_id: id,
      deadline: newDeadline,
    };
    try {
      const res = await serverapi.put(api, data, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (res.status === 200) {
        setShowToast(true);
        setShowModal(false);
        setShowSubModal(false);
        // window.location.reload();
        setPage(1);
        setHasMore(true);
        setData([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCurrentHis = async (id) => {
    const api = `/history`;
    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      const filteredData = res.data.res.filter(
        (item) => item.id === Number(id)
      )[0];
      if (res.status === 200) {
        console.log(id);
        console.log(filteredData);
        setCurrentId(Number(id));
      }
      return filteredData;
    } catch (e) {
      console.log(e);
    }
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
          sort_by: isOnPray ? "cnt" : "date",
        },
      });
      if (res.status === 200) {
        console.log(res.data.res);
        console.log(page);
        const newData = res.data.res;
        setData((prev) => [...prev, ...newData]);
        if (res.data.res.length === 0) {
          setHasMore(false);
        }
      }
      setLoading(false);
    } catch (e) {
      console.log(e.response);
    }
  }, [page, isOnPray]);

  const onClickHistory = async (e) => {
    setShowModal(true);
    const id = e.currentTarget.id;
    const currentData = data.find((item) => item.id === Number(id));
    if (currentData) {
      setCurrentData(currentData);
      setCurrentId(Number(id));
    } else {
      const currentData = await fetchCurrentHis(id);
      setCurrentData(currentData);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, inView]);

  return (
    <HistoryWrapper>
      <Header>히스토리</Header>
      {isEmptyData(data) && (
        <NoDataWrapper>
          <NoDataTitle>완료된 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>기간이 지나면 히스토리에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      {!isEmptyData(data) && showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={onClickExitModal} />
          <ModalWrapper showSubModal={showSubModal}>
            <ModalHeader>
              <ModalTitleWrapper>
                <ModalTitle>
                  <ModalTarget>{currentData.target}</ModalTarget>의 기도제목
                </ModalTitle>
                <ModalDate>
                  {currentData?.created_at?.split(" ")[0]} ~{" "}
                  {currentData.deadline}, {currentData.pray_cnt}회 기도
                </ModalDate>
              </ModalTitleWrapper>
            </ModalHeader>
            <ModalContent>{currentData.title}</ModalContent>
            <ModalWriter>
              {currentData.writer}{" "}
              {currentData?.origin_created_at?.split(" ")[0]} 작성
            </ModalWriter>
            <ModalButtonWrapper>
              <ModalButton1
                showSubModal={showSubModal}
                onClick={onClickSubModal}
              >
                또 기도하기
              </ModalButton1>
              <ModalButton2 onClick={onClickExitModal}>닫기</ModalButton2>
            </ModalButtonWrapper>
          </ModalWrapper>
        </>
      )}
      {showSubModal && (
        <SubModalWrapper>
          <SubModalTop>
            <SubModalBtn
              isSelected={selectedBtn === 3}
              onClick={() => onClickUpdateDate(3)}
            >
              3일
            </SubModalBtn>
            <SubModalBtn
              isSelected={selectedBtn === 7}
              onClick={() => onClickUpdateDate(7)}
            >
              7일
            </SubModalBtn>
            <SubModalBtn
              isSelected={selectedBtn === 30}
              onClick={() => onClickUpdateDate(30)}
            >
              30일
            </SubModalBtn>
            <SubModalBtn
              isSelected={selectedBtn === 100}
              onClick={() => onClickUpdateDate(100)}
            >
              100일
            </SubModalBtn>
            <img
              src="../images/icon_calender.svg"
              alt="icon_calender"
              onClick={handleButtonClick}
            />
            {showDatePicker && (
              <DatePickerContainer>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => onChangeDatePicker(date)}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  popperPlacement="bottom-start"
                  onClickOutside={() => setShowDatePicker(false)}
                  locale={ko}
                  inline
                />
              </DatePickerContainer>
            )}
            <SubModalDate>~{updateDate}</SubModalDate>
          </SubModalTop>
          <SubModalBottom onClick={() => onClickModify(currentId, updateDate)}>
            오늘의 기도에 추가하기
          </SubModalBottom>
        </SubModalWrapper>
      )}
      {!isEmptyData(data) && (
        <>
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
        </>
      )}
      {data.map((el, index) => (
        <div onClick={onClickHistory} key={index} id={el.id}>
          <HisContent
            name={el.target}
            content={el.title}
            date={`${el.created_at.split(" ")[0]} ~ ${el.deadline}`}
          />
          <div ref={ref}></div>
        </div>
      ))}
      <div style={{ marginTop: "20px" }}>.</div>
      <ToastWrapper>
        {showToast && (
          <Toast toastTheme={ToastTheme.SUCCESS}>
            마감일이 업데이트 되었습니다.
          </Toast>
        )}
      </ToastWrapper>
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

const NoDataWrapper = styled.div`
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
  color: #a0a0a0;
`;
const NoDataContent = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #cecece;
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

const ModalWrapper = styled.div`
  position: fixed;
  top: ${(props) => (props.showSubModal ? `38.5%` : `50%`)};
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  /* gap: 8px; */
  border-radius: 16px;
  z-index: 300;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 0px 8px 28px;
`;

const ModalTitleWrapper = styled.div``;

const ModalTitle = styled.div`
  color: #606060;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 1px;
`;

const ModalTarget = styled.span`
  color: #7bab6e;
  font-size: 20px;
`;

const ModalDate = styled.div`
  color: #7bab6e;
  font-size: 12px;
  line-height: 17px;
`;

const ModalContent = styled.div`
  padding: 0px 28px 12px 28px;
  font-size: 16px;
  line-height: 23px;
  color: #606060;
`;

const ModalWriter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0px 20px 11px 0px;
  font-size: 12px;
  color: #a0a0a0;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 14px;
  padding: 0px 16px 20px;
`;

const ModalButton1 = styled.button`
  width: 100%;
  height: 66px;
  background-color: ${(props) => (props.showSubModal ? "#D0E8CB" : "#ffffff")};
  border: ${(props) => (props.showSubModal ? "none" : "1px solid #7bab6e")};
  border-radius: 16px;
  padding: 20px 0;
  color: #7bab6e;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const ModalButton2 = styled.button`
  width: 100%;
  height: 66px;
  background-color: #7bab6e;
  border-style: none;
  border-radius: 16px;
  padding: 20px 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`;

const SubModalWrapper = styled.div`
  position: fixed;
  top: 63%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 16px;
  z-index: 300;
`;

const SubModalTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 24px 16px;
  align-items: center;
`;

const SubModalBtn = styled.div`
  border: 1px solid #75bd62;
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 17px;
  color: #75bd62;
  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    css`
      background-color: #75bd62;
      color: #ffffff;
    `}
`;

const SubModalDate = styled.div`
  font-size: 12px;
  line-height: 17px;
  color: #75bd62;
`;

const SubModalBottom = styled.div`
  background: #7bab6e;
  border-radius: 0px 0px 16px 16px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  padding: 25px 0px;
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: -150%;
  left: 40%;
  z-index: 400;
`;

const ToastWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;