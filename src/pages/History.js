import Header from "../components/Header/Header";
import styled, { css } from "styled-components";
import HisContent from "../components/History/HisContent";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlackScreen from "../components/BlackScreen/BlackScreen";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { ko } from "date-fns/esm/locale";
import Toast, { ToastTheme } from "../components/Toast/Toast";
import { useFetchHistory } from "../hooks/useFetchHistory";
import { useHistoryModify } from "../hooks/useHistoryModify";
import Lottie from "react-lottie";
import LottieData from "../components/Main/json/uspray.json";
import Calender from "../components/Calender/Calender";

const History = () => {
  const [loading, setLoading] = useState(true);
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
  const [isClickedDay, setIsClickedDay] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({
    // triggerOnce: true, // 한 번만 트리거되도록 설정
  });

  const defaultOptions = {
    //예제1
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
    const formattedDate1 = `${yyyy}-${mm}-${dd}`;
    setUpdateDate(formattedDate1);
    setSelectedBtn(days); // css 변경용
    setIsClickedDay(true);
  };

  const onChangeDatePicker = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`; // 포맷된 날짜 생성
    setUpdateDate(formattedDate); // formattedDate를 업데이트
    setShowDatePicker(false); // DatePicker 닫기
    setIsClickedDay(true);
  };

  const handleButtonClick = () => {
    setShowDatePicker(true);
  };

  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  const onClickExitModal = () => {
    setSelectedBtn("");
    setSelectedDate(null);
    setShowDatePicker(false);
    setIsClickedDay(false);
    setShowModal(false);
    setShowSubModal(false);
  };

  const onClickSubModal = () => {
    setShowSubModal(!showSubModal);
    onClickUpdateDate(7);
  };

  const {
    data: historyData,
    // isLoading: historyLoading,
    refetch: refetchHistory,
  } = useFetchHistory({
    page: page,
    per_page: 15,
    sort_by: "date",
  });

  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const fetchHistory = async () => {
    // setLoading(historyLoading);
    console.log(data);
    const newData = await historyData.data.res;
    const filteredData = newData.filter(
      (newItem) => !data.some((existingItem) => existingItem.id === newItem.id)
    );
    console.log(filteredData);
    console.log(deletedItemIds);
    const dData = [...data, ...filteredData].filter(
      (item) => !deletedItemIds.some((dItem) => dItem === item.id)
    );
    setData(dData);
    console.log("리스트 읽기");
    console.log("페이지 :" + page);
    console.log("hasmore? :" + hasMore);
    console.log("inview? :" + inView);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  const { mutate: mutateHistoryModify } = useHistoryModify();

  const onClickModify = () => {
    mutateHistoryModify(
      {
        pray_id: currentId,
        deadline: updateDate,
      },
      {
        onSuccess: (res) => {
          setShowToast(true);
          setShowModal(false);
          setShowSubModal(false);
          setDeletedItemIds((prev) => [...prev, res.data.id]);
          setSelectedBtn("");
          setSelectedDate(null);
          setShowDatePicker(false);
          setIsClickedDay(false);
          refetchHistory();
        },
      }
    );
  };

  const onClickHistory = async (e) => {
    setShowModal(true);
    const id = e.currentTarget.id;
    const currentData = data.find((item) => item.id === Number(id));
    console.log(currentData);
    setCurrentData(currentData);
    setCurrentId(Number(id));
  };

  useEffect(() => {
    setLoading(true);
    if (historyData) {
      fetchHistory();
      setLoading(false);
      console.log(historyData);
    }
  }, [historyData]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, inView]);

  return (
    <HistoryWrapper>
      <Header>히스토리</Header>
      {loading && (
        <Lottie
          style={{ scale: "0.5" }}
          options={defaultOptions}
          height={300}
          width={300}
          isClickToPauseDisabled={true}
        />
      )}
      {!loading && isEmptyData(data) && (
        <NoDataWrapper>
          <NoDataTitle>완료된 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>기간이 지나면 히스토리에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      <div>
        <BlackScreen isModalOn={showModal} />
        {!isEmptyData(data) && showModal && (
          <>
            <ModalWrapper showSubModal={showSubModal}>
              <ModalHeader>
                <ModalTitleWrapper>
                  <ModalTitle>
                    <ModalTarget>{currentData.target}</ModalTarget>의 기도제목
                  </ModalTitle>
                  <ModalDate>
                    {currentData?.created_at?.split(" ")[0].replace(/-/g, ".")}{" "}
                    ~ {currentData.deadline.replace(/-/g, ".")},{" "}
                    {currentData.pray_cnt}회 기도
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
        {/* {showSubModal && ( */}
        <SubModalWrapper showSubModal={showSubModal}>
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
            {showDatePicker ? (
              <img
                src="../images/icon_calender_filled.svg"
                alt="icon_calender"
              />
            ) : (
              <img
                src="../images/icon_calender.svg"
                alt="icon_calender"
                onClick={handleButtonClick}
              />
            )}
            {showDatePicker && (
              <DatePickerContainer>
                <Calender
                  selectedDate={selectedDate}
                  onChangeDatePicker={onChangeDatePicker}
                  setShowDatePicker={setShowDatePicker}
                />
              </DatePickerContainer>
            )}
            {isClickedDay && (
              <SubModalDate>~{updateDate.replace(/-/g, "/")}</SubModalDate>
            )}
          </SubModalTop>
          <SubModalBottom onClick={() => onClickModify()}>
            오늘의 기도에 추가하기
          </SubModalBottom>
        </SubModalWrapper>
        {/* )} */}
      </div>
      <div style={{ paddingTop: "65px" }}>
        {data.map((el) => (
          <div onClick={onClickHistory} key={el.id} id={el.id}>
            <HisContent
              name={el.target}
              content={el.title}
              date={`${el.created_at.split(" ")[0]} ~ ${el.deadline}`}
              pray_cnt={el.pray_cnt}
            />
            <div ref={ref}></div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", color: "#D0E8CB" }}>.</div>
      <ToastWrapper>
        {showToast && (
          <Toast toastTheme={ToastTheme.SUCCESS}>
            기도제목이 오늘의 기도에 추가되었어요.
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
  position: relative;
  /* padding-top: 65px; */
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
  color: var(--color-grey);
`;
const NoDataContent = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: var(--color-secondary-grey);
`;

const ModalWrapper = styled.div`
  position: fixed;
  /* top: ${(props) => (props.showSubModal ? `40%` : `50%`)}; */
  bottom: ${(props) => (props.showSubModal ? `32%` : `25%`)};
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-white);
  /* gap: 8px; */
  border-radius: 16px;
  z-index: 300;
  transition: all 0.3s ease-in-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 0px 8px 28px;
`;

const ModalTitleWrapper = styled.div``;

const ModalTitle = styled.div`
  color: var(--color-dark-grey);
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 1px;
`;

const ModalTarget = styled.span`
  color: var(--color-dark-green);
  font-size: 20px;
`;

const ModalDate = styled.div`
  color: var(--color-dark-green);
  font-size: 12px;
  line-height: 17px;
`;

const ModalContent = styled.div`
  padding: 0px 28px 12px 28px;
  font-size: 16px;
  line-height: 23px;
  color: var(--color-dark-grey);
`;

const ModalWriter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0px 20px 11px 0px;
  font-size: 12px;
  color: var(--color-grey);
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 0px 16px 20px;
`;

const ModalButton1 = styled.button`
  width: 100%;
  background-color: var(
    ${(props) => (props.showSubModal ? "--color-light-green" : "--color-white")}
  );
  border: ${(props) => (props.showSubModal ? "none" : "1px solid #7bab6e")};
  border-radius: 16px;
  padding: 16px 0;
  color: var(--color-dark-green);
  font-size: 18px;
  cursor: pointer;
`;

const ModalButton2 = styled.button`
  width: 100%;
  background-color: var(--color-dark-green);
  border-style: none;
  border-radius: 16px;
  padding: 16px 0;
  color: var(--color-white);
  font-size: 18px;
  cursor: pointer;
  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
    scale: ${(props) => (props.disabled ? "1" : "0.98")};
  }
`;

const SubModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, -40%);
  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 16px;
  z-index: 300;
  top: 63%;
  opacity: ${(props) => (props.showSubModal ? "1" : "0")};
  transition: all 0.3s ease-in-out;
  visibility: ${(props) => (props.showSubModal ? "visible" : "hidden")};
`;

const SubModalTop = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 24px 16px;
  align-items: center;
  gap: 8px;
`;

const SubModalBtn = styled.div`
  border: 1px solid var(--color-green);
  border-radius: 8px;
  padding: 4px 8px;
  word-break: keep-all;
  font-size: 12px;
  line-height: 17px;
  color: var(--color-green);
  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--color-green);
      color: var(--color-white);
    `}
  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
    scale: ${(props) => (props.disabled ? "1" : "0.90")};
  }
`;

const SubModalDate = styled.div`
  font-size: 12px;
  color: var(--color-green);
  transform: translateX(-4px);
`;

const SubModalBottom = styled.div`
  background: var(--color-dark-green);
  border-radius: 0px 0px 16px 16px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: var(--color-white);
  padding: 20px 0px;
  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
  }
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: -150%;
  left: 40%;
  z-index: 400;
`;

const DatePickerHeader = styled.div`
  /* background: #7bab6e; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 15px 16px 12px;
  /* align-items: center; */
`;

const DatePickerHeaderDate = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

const ToastWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
