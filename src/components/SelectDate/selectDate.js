import styled, { css } from "styled-components";
import Calender from "../Calender/Calender";

/*
  props 넘겨받을 목록 (History.js 파일 참고하기)
  1. onClickUpdateDate 함수 (각각의 날짜 아이콘 선택 시)
  2. showDatePicker 변수 (달력 show 유무 상태)
  3. selectedBtn 변수 (각 날짜 버튼 클릭 유무 상태)
  4. isClickedDay 변수
  5. designedDate 변수
  ------ Calender 관련 ------
  1. selectedDate 변수 (현재 선택된 날짜)
  2. onChangeDatePicker 함수 (날짜 선택 시 반영)
  3. setShowDatePicker 변수 (달력 show 유무 수정)
*/

const SelectDate = (props) => {
  const dateOptions = [3, 7, 30, 100];

  const handleButtonClick = () => {
    props.setShowDatePicker(!props.showDatePicker);
    props.onClickUpdateDate("");
  };

  return (
    <>
      {dateOptions.map((option) => (
        <SubModalBtn
          key={option}
          isSelected={props.selectedBtn === option}
          onClick={() => props.onClickUpdateDate(option)}
        >
          {`${option}일`}
        </SubModalBtn>
      ))}
      <CalenderIcon
        src={
          props.showDatePicker
            ? "../images/icon_calender_filled.svg"
            : "../images/icon_calender.svg"
        }
        alt="icon_calender"
        onClick={handleButtonClick}
      />

      {props.showDatePicker && (
        <DatePickerContainer>
          <Calender
            selectedDate={props.selectedDate}
            onChangeDatePicker={props.onChangeDatePicker}
            setShowDatePicker={props.setShowDatePicker}
          />
        </DatePickerContainer>
      )}
      {props.isClickedDay && (
        <SubModalDate>~{props.designedDate.replace(/-/g, ".")}</SubModalDate>
      )}
    </>
  );
};

export default SelectDate;

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

const DatePickerContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 400;
`;

const CalenderIcon = styled.img`
  transition: all 0.2s ease-in-out;
  :active {
    filter: brightness(0.9);
    transform: scale(0.9);
  }
`;
