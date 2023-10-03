import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Checkbox, { CheckboxTheme } from "../components/Checkbox/Checkbox";

const HistorySearch = () => {
  const [isClickedCalender, setIsClickedCalender] = useState(false);
  const navigate = useNavigate();

  const onClickBackArrow = () => {
    navigate("/history");
  };

  const onClickCalender = () => {
    setIsClickedCalender(!isClickedCalender);
  };

  return (
    <>
      <Wrapper>
        <SearchWrapper>
          <Header>
            <img
              onClick={onClickBackArrow}
              src="../images/ic_back_arrow.svg"
              alt="icon_backArrow"
            />
            <div>히스토리 검색</div>
            <div onClick={onClickCalender}>
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
              <DateWrapper>
                <DateBox>2023.08.27 (월)</DateBox>
                <img src="../images/ic_thin_arrow.svg" alt="icon_rightArrow" />
                <DateBox>2023.08.27 (수)</DateBox>
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
    </>
  );
};

export default HistorySearch;

const Wrapper = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  display: flex;
  background-color: var(--color-dark-green);
  width: 100%;
  flex-direction: column;
  border-radius: 0px 0px 16px 16px;
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
`;

const SearchBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DateWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  color: var(--color-grey-50);
`;

const DateBox = styled.div`
  border-radius: 8px;
  background-color: var(--color-white);
  padding: 8px 36px;
`;

const CheckboxWrapper = styled.div``;
