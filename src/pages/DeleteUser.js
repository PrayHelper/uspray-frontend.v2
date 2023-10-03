import styled from "styled-components";
import UserHeader from "../components/UserHeader";
import Checkbox from "../components/Checkbox/Checkbox";
import { useState } from "react";
import DeleteReasonOptionList from "../components/WithdrawalReason/DeleteReasonOptionList";

const initialDeleteReasonOptionList = [
  { id: "NOT-IN-USE", text: "쓰지 않는 서비스에요.", checked: false },
  { id: "LACK-OF-FUNCTION", text: "원하는 기능이 없어요.", checked: false },
  {
    id: "TOO-MANY-ERROS",
    text: "오류가 많아서 쓸 수가 없어요.",
    checked: false,
  },
  { id: "INCONVENIENCE", text: "사용하기에 불편함이 있어요.", checked: false },
  { id: "ETC", text: "기타", checked: false },
];

const DeleteUser = () => {
  const [deleteReasonOptionList, setDeleteOptionList] = useState(
    initialDeleteReasonOptionList
  );
  const [isAgreementsChecked, setIsAgreementsChecked] = useState(false);
  const [etcReasonInput, setEtcReasonInput] = useState("");

  // 조건이 정해짐에 따라 수정 필요!
  const isContinueBtnEnabled = isAgreementsChecked;

  const isEtcChecked = deleteReasonOptionList.find(
    (item) => item.id == "ETC"
  ).checked;

  const toggleOptionById = (id) => {
    setDeleteOptionList(
      deleteReasonOptionList.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const toggleAgreementsChecked = () => {
    setIsAgreementsChecked(!isAgreementsChecked);
  };

  const onChangeEtcReasonInput = (e) => {
    setEtcReasonInput(e.target.value);
  };

  return (
    <S.Root>
      <UserHeader>회원정보 확인</UserHeader>
      <S.Content>
        <S.TopTextsAndOptions>
          <S.TopTexts>
            <S.TopTextCrying>홍길동님... 이대로 이별인가요?</S.TopTextCrying>
            <S.TopTextWondering>
              계정을 삭제하려는 이유가 궁금해요.
            </S.TopTextWondering>
          </S.TopTexts>
          <DeleteReasonOptionList
            toggleOptionById={toggleOptionById}
            deleteReasonOptionList={deleteReasonOptionList}
          />
          {isEtcChecked && (
            <S.EtcReasonInput
              placeholder={
                "계정 삭제 사유에 대해 알려주세요. \n회원님의 소중한 피드백을 통하여 더 나은 서비스로 발전하겠습니다."
              }
              value={etcReasonInput}
              onChange={onChangeEtcReasonInput}
            />
          )}
        </S.TopTextsAndOptions>

        <S.DeleteCautionAndAgreement>
          <S.Caution>
            <S.CautionTitle>계정 삭제 전 주의사항</S.CautionTitle>
            <S.Divider />
            <S.CautionInformation>
              - Uspray 계정 삭제 후 7일간 재가입이 불가능합니다.
            </S.CautionInformation>
            <S.CautionInformation>
              - Uspary 계정 삭제 시 계정의 모든 정보는 삭제되며 재가입 시에도
              복구할 수 없습니다.
            </S.CautionInformation>
          </S.Caution>
          <S.Agreement>
            <Checkbox
              checked={isAgreementsChecked}
              handler={toggleAgreementsChecked}
              label={"주의사항을 모두 확인하였으며, 이에 동의합니다."}
              id={"agreement"}
            />
          </S.Agreement>
        </S.DeleteCautionAndAgreement>
      </S.Content>
      {/* TODO: onPress로 모달 띄우거나 API 붙이기 */}
      <S.ContinueBtn isEnabled={isContinueBtnEnabled}>계속하기</S.ContinueBtn>
    </S.Root>
  );
};

export default DeleteUser;

const S = {
  Root: styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
  `,
  Content: styled.div`
    flex: 1;
    margin: 36px 16px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  TopTextsAndOptions: styled.div`
    display: flex;
    flex-direction: column;
  `,
  TopTexts: styled.div``,
  TopTextCrying: styled.div`
    color: var(--Dark_Gray, #606060);
    font-family: Noto Sans KR;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `,
  TopTextWondering: styled.div`
    color: var(--Dark_Gray, #606060);
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  DeleteCautionAndAgreement: styled.div`
    display: flex;
    flex-direction: column;
    gap: 44px;
  `,
  Caution: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  CautionTitle: styled.div`
    color: var(--Grey, #a0a0a0);
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
  CautionInformation: styled.div`
    color: var(--Grey, #a0a0a0);
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `,
  Divider: styled.div`
    height: 1px;
    background: var(--Light_Grey, #eee);
    margin: 12px 0px;
  `,
  Agreement: styled.div`
    display: flex;

    flex-direction: row;
    width: 100%;
  `,
  ContinueBtn: styled.button`
    // remove default button style
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;

    width: 100%;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;

    padding: 20px;

    ${({ isEnabled }) =>
      isEnabled
        ? `
    background-color: #FF6B6B;
    color: #FFFFFF;
    `
        : `
    background-color: #EEEEEE;
    color: #A0A0A0;

    `}
  `,
  EtcReasonInput: styled.textarea`
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/

    height: 168px;

    border-radius: 4px;
    border: 1px solid #eeeeee;
    padding: 16px 12px;
  `,
};
