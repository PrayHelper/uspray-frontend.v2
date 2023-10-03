import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Calender from "../components/Calender/Calender";
import Checkbox, { CheckboxTheme } from "../components/Checkbox/Checkbox";

const HistorySearch = () => {
  const [isClickedCalender, setIsClickedCalender] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  const onClickBackArrow = () => {
    navigate("/history");
  };

  const onClickStartDateBox = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const onClickEndDateBox = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  const onClickCalender = () => {
    setIsClickedCalender(!isClickedCalender);
    setStartDate(updateDate(-30));
    setEndDate(updateDate(0));
  };

  const updateDate = (days) => {
    const today = new Date();
    const targetDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    const options = { weekday: "long" };
    const koreanWeekday = new Intl.DateTimeFormat("ko-KR", options).format(
      targetDate
    );
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
    const dd = String(targetDate.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd} (${koreanWeekday[0]})`;
    return formattedDate;
  };

  const updateDatePicker = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
    const options = { weekday: "long" };
    const koreanWeekday = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd} (${koreanWeekday[0]})`; // 포맷된 날짜 생성
    return formattedDate;
  };

  const onChangeStartDatePicker = (date) => {
    setStartDate(updateDatePicker(date)); // formattedDate를 업데이트
    setShowStartDatePicker(false); // DatePicker 닫기
    setShowEndDatePicker(true); // DatePicker 닫기
  };

  const onChangeEndDatePicker = (date) => {
    setEndDate(updateDatePicker(date)); // formattedDate를 업데이트
    setShowEndDatePicker(false); // DatePicker 닫기
  };

  return (
    <>
      <BlackScreen isModalOn={showStartDatePicker || showEndDatePicker} />
      <Wrapper>
        <SearchWrapper>
          <Header>
            <img
              onClick={onClickBackArrow}
              src="../images/ic_back_arrow.svg"
              alt="icon_backArrow"
            />
            <div>히스토리 검색</div>
            <div
              onClick={() => {
                onClickCalender();
              }}
            >
              {isClickedCalender ? (
                <img src="../images/ic_calender_gray.svg" alt="icon_calender" />
              ) : (
                <img src="../images/ic_calender.svg" alt="icon_calender" />
              )}
            </div>
          </Header>
          <MainWrapper>
            <SearchBarWrapper>
              <SearchBar placeholder="이름, 내용을 검색하세요." />
              <SearchBtn>
                <img src="../images/ic_search_main.svg" alt="icon_search" />
              </SearchBtn>
            </SearchBarWrapper>
            {isClickedCalender && (
              <DateWrapper isClickedCalender={isClickedCalender}>
                <DateBox
                  isClicked={showStartDatePicker}
                  onClick={onClickStartDateBox}
                >
                  {startDate.replace(/-/g, ".")}
                </DateBox>
                {showStartDatePicker && (
                  <StartDatePickerContainer>
                    <Calender
                      maxDate={new Date()}
                      selectedDate={selectedDate}
                      onChangeDatePicker={onChangeStartDatePicker}
                      setShowDatePicker={setShowStartDatePicker}
                    />
                  </StartDatePickerContainer>
                )}
                <img src="../images/ic_thin_arrow.svg" alt="icon_rightArrow" />
                <DateBox
                  isClicked={showEndDatePicker}
                  onClick={onClickEndDateBox}
                >
                  {endDate.replace(/-/g, ".")}
                </DateBox>
                {showEndDatePicker && (
                  <EndDatePickerContainer>
                    <Calender
                      maxDate={new Date()}
                      minDate={selectedDate}
                      selectedDate={selectedDate}
                      onChangeDatePicker={onChangeEndDatePicker}
                      setShowDatePicker={setShowEndDatePicker}
                    />
                  </EndDatePickerContainer>
                )}
              </DateWrapper>
            )}
            <CheckboxWrapper>
              <Checkbox
                theme={CheckboxTheme.WHITE}
                id="tos1"
                label={"내가 쓴 기도제목"}
                size={"12px"}
              />
              <Checkbox
                theme={CheckboxTheme.WHITE}
                id="tos1"
                label={"공유받은 기도제목"}
                size={"12px"}
              />
            </CheckboxWrapper>
          </MainWrapper>
        </SearchWrapper>
      </Wrapper>
      <div>asd</div>
    </>
  );
};

export default HistorySearch;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  display: flex;
  background-color: var(--color-dark-green);
  width: 100%;
  flex-direction: column;
  border-radius: 0px 0px 16px 16px;
  transition: all 0.3s;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  color: var(--color-white);
  margin: 16px;
`;

const MainWrapper = styled.div`
  margin: 16px;
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 8px;
`;

const SearchBar = styled.input`
  flex: 1; /* 입력 필드를 확장하여 나머지 공간을 차지하도록 함 */
  border: none;
  outline: none;
  font-size: 16px;
  ::placeholder {
    color: var(--color-grey-50);
  }
  color: var(--color-grey);
`;

const SearchBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const StartDatePickerContainer = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  z-index: 400;
`;

const EndDatePickerContainer = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  z-index: 400;
`;

const DateWrapper = styled.div`
  z-index: 400;
  position: relative;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  animation: ${(props) =>
    props.isClickedCalender
      ? css`
          ${fadeIn} 0.5s ease
        `
      : `none`};
`;

const DateBox = styled.div`
  border-radius: 8px;
  color: ${(props) =>
    props.isClicked ? `var(--color-green)` : `var(--color-grey-50)`};
  background-color: var(--color-white);
  padding: 8px 36px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
