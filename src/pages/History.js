import Header from "../components/Header/Header";
import styled from "styled-components";
import HisContent from "../components/History/HisContent";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import { useFetchHistory } from "../hooks/useFetchHistory";
import { useHistoryModify } from "../hooks/useHistoryModify";
import Lottie from "react-lottie";
import LottieData from "../components/Main/json/uspray.json";
import useToast from "../hooks/useToast";
import SelectDate from "../components/SelectDate/selectDate";

const History = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [currentId, setCurrentId] = useState();
  const [selectedBtn, setSelectedBtn] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
  const [updateDate, setUpdateDate] = useState(null); // yyyy.mm.dd (api 호출용)
  const [showDatePicker, setShowDatePicker] = useState(false);
<<<<<<< HEAD
  const [pageMy, setPageMy] = useState(1);
  const [pageShared, setPageShared] = useState(1);
  const [dataMy, setDataMy] = useState([]);
  const [dataShared, setDataShared] = useState([]);
  const [myScrollPos, setMyScrollPos] = useState(0);
  const [sharedScrollPos, setSharedScrollPos] = useState(0);
  const [sortBy, setSortBy] = useState("date");
=======

>>>>>>> origin
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView({});

  const { showToast } = useToast({
    initialMessage: "기도제목이 오늘의 기도에 추가되었어요.",
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const isEmptyData = (data) => {
    return data.length === 0 ? true : false;
  };

  const onClickExitModal = () => {
    setSelectedBtn("");
    setSelectedDate(null);
    setShowDatePicker(false);
    setShowModal(false);
    setShowSubModal(false);
  };

  const onClickSubModal = () => {
    setShowSubModal(!showSubModal);
  };

<<<<<<< HEAD
  const onClickToggle = (e) => {
    sortBy === "date"
      ? setMyScrollPos(window.scrollY)
      : setSharedScrollPos(window.scrollY);
    handleCategoryChange(e.currentTarget.id);
  };

  const handleCategoryChange = (newCategory) => {
    setSortBy(newCategory);
  };

  useEffect(() => {
    // 카테고리가 변경될 때 스크롤 위치 복원
    sortBy === "date"
      ? window.scrollTo(0, myScrollPos)
      : window.scrollTo(0, sharedScrollPos);
  }, [sortBy, myScrollPos, sharedScrollPos]);

  const [deletedItemIds, setDeletedItemIds] = useState([]);

  const { data: myPrayData, refetch: refetchMyData } = useFetchHistory({
    page: pageMy,
=======
  const { data: historyData, refetch: refetchHistory } = useFetchHistory({
    page: page,
>>>>>>> origin
    per_page: 15,
    sort_by: "date",
  });

<<<<<<< HEAD
  const { data: sharedPrayData, refetch: refetchSharedData } = useFetchHistory({
    page: pageShared,
    per_page: 15,
    sort_by: "cnt",
  });

  const fetchMyData = async () => {
    const newData = await myPrayData.data.res;
=======
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const fetchHistory = async () => {
    console.log(data);
    const newData = await historyData.data.res;
>>>>>>> origin
    const filteredData = newData.filter(
      (newItem) =>
        !dataMy.some((existingItem) => existingItem.id === newItem.id)
    );
    const dData = [...dataMy, ...filteredData].filter(
      (item) => !deletedItemIds.some((dItem) => dItem === item.id)
    );
    setDataMy(dData);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  const fetchSharedData = async () => {
    const newData = await sharedPrayData.data.res;
    const filteredData = newData.filter(
      (newItem) =>
        !dataShared.some((existingItem) => existingItem.id === newItem.id)
    );
    const dData = [...dataShared, ...filteredData].filter(
      (item) => !deletedItemIds.some((dItem) => dItem === item.id)
    );
    setDataShared(dData);
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  const { mutate: mutateHistoryModify } = useHistoryModify();

  const onClickModify = (sortBy) => {
    mutateHistoryModify(
      {
        pray_id: currentId,
        deadline: updateDate,
      },
      {
        onSuccess: (res) => {
          showToast({});
<<<<<<< HEAD
          setDeletedItemIds((prev) => [...prev, res.data.id]);
          onClickExitModal();
          sortBy === "Date" ? refetchMyData() : refetchSharedData();
=======
          setShowModal(false);
          setShowSubModal(false);
          setDeletedItemIds((prev) => [...prev, res.data.id]);
          setSelectedBtn("");
          setSelectedDate(null);
          setShowDatePicker(false);
          refetchHistory();
>>>>>>> origin
        },
      }
    );
  };

  const onClickHistoryItem = async (e, sortBy) => {
    setShowModal(true);
    const id = e.currentTarget.id;
<<<<<<< HEAD
    const currentData =
      sortBy === "date"
        ? dataMy.find((item) => item.id === Number(id))
        : dataShared.find((item) => item.id === Number(id));
=======
    const currentData = data.find((item) => item.id === Number(id));
>>>>>>> origin
    setCurrentData(currentData);
    setCurrentId(Number(id));
  };

  useEffect(() => {
    setLoading(true);
    if (myPrayData) {
      fetchMyData();
      setLoading(false);
    }
  }, [myPrayData]);

  useEffect(() => {
    setLoading(true);
    if (sharedPrayData) {
      fetchSharedData();
      setLoading(false);
    }
  }, [sharedPrayData]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      sortBy === "date"
        ? setPageMy((prev) => prev + 1)
        : setPageShared((prev) => prev + 1);
    }
  }, [hasMore, inView]);

  return (
    <HistoryWrapper>
      <Header sortBy={sortBy} onClickToggle={onClickToggle}>
        히스토리
      </Header>
      {loading && (
        <LottieWrapper>
          <Lottie
<<<<<<< HEAD
            style={{ scale: "0.5", marginTop: "50px" }}
=======
            style={{ scale: "0.5" }}
>>>>>>> origin
            options={defaultOptions}
            height={300}
            width={300}
            isClickToPauseDisabled={true}
          />
        </LottieWrapper>
      )}
      {!loading && isEmptyData(dataMy) && (
        <NoDataWrapper>
          <NoDataTitle>완료된 기도제목이 없네요.</NoDataTitle>
          <NoDataContent>기간이 지나면 히스토리에 저장됩니다!</NoDataContent>
        </NoDataWrapper>
      )}
      <div>
        <BlackScreen isModalOn={showModal} />
        {!isEmptyData(dataMy) && showModal && (
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
        <SubModalWrapper showSubModal={showSubModal}>
          <SubModalTop>
            <SelectDate
              {...{
                selectedBtn,
                setSelectedBtn,
                selectedDate,
                setSelectedDate,
                showDatePicker,
                setShowDatePicker,
                setUpdateDate,
                showSubModal,
              }}
            />
          </SubModalTop>
          <SubModalBottom onClick={() => onClickModify(sortBy)}>
            오늘의 기도에 추가하기
          </SubModalBottom>
        </SubModalWrapper>
      </div>
<<<<<<< HEAD
      {sortBy === "date" && (
        <div style={{ paddingTop: "115px" }}>
          {/* <div> */}
          {dataMy.map((el) => (
            <div
              onClick={(e) => onClickHistoryItem(e, sortBy)}
              key={el.id}
              id={el.id}
            >
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
      )}
      {sortBy === "cnt" && (
        <div style={{ paddingTop: "115px" }}>
          {dataShared.map((el) => (
            <div
              onClick={(e) => onClickHistoryItem(e, sortBy)}
              key={el.id}
              id={el.id}
            >
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
      )}
      <div style={{ marginTop: "20px", color: `#D0E8CB` }}>.</div>
=======
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
>>>>>>> origin
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
const LottieWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LottieWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoDataTitle = styled.div`
  font-weight: 500;
  font-size: 28px;
  color: var(--color-grey);
`;
const NoDataContent = styled.div`
  font-weight: 400;
  font-size: 20px;
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
    ${(props) =>
      props.showSubModal ? "--color-light-green" : "--color-dark-green"}
  );
  border: none;
  border-radius: 16px;
  padding: 16px 0;
  color: var(
    ${(props) => (props.showSubModal ? "--color-dark-green" : "--color-white")}
  );
  font-size: 18px;
  cursor: pointer;
`;

const ModalButton2 = styled.button`
  width: 100%;
  background-color: var(--color-white);
  border-style: none;
  border-radius: 16px;
  border: ${(props) => (props.showSubModal ? "none" : "1px solid #7bab6e")};
  // border: 1px solid var(--color-dark-green);
  padding: 16px 0;
  color: var(--color-dark-green);
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
  background-color: var(--color-white);
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

const SubModalBottom = styled.div`
  background: var(--color-dark-green);
  border-radius: 0px 0px 16px 16px;
  font-weight: 500;
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
