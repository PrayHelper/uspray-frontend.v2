import styled from "styled-components";
import UserHeader from "../components/UserHeader";
import Checkbox from "../components/Checkbox/Checkbox";
import { useState } from "react";
import DeleteReasonOptionList from "../components/WithdrawalReason/DeleteReasonOptionList";

const initialDeleteReasonOptionList = [
  { id: 0, text: "쓰지 않는 서비스에요.", checked: false },
  { id: 1, text: "원하는 기능이 없어요.", checked: false },
  { id: 2, text: "오류가 많아서 쓸 수가 없어요.", checked: false },
  { id: 3, text: "사용하기에 불편함이 있어요.", checked: false },
  { id: 4, text: "기타", checked: false },
];

const DeleteUser = () => {
  const [deleteReasonOptionList, setDeleteOptionList] = useState(
    initialDeleteReasonOptionList
  );
  const [agreementsChecked, setAgreementsChecked] = useState(false);

  const toggleAgreementsChecked = () => {
    setAgreementsChecked(!agreementsChecked);
  };

  return (
    <S.Root>
      <UserHeader>회원정보 확인</UserHeader>
      <S.wrapper>
        {/* 상단 - 텍스트와 옵션 묶기 */}
        <S.TopTextsAndOptions>
          <S.TopTexts>
            <S.TopTextCrying>홍길동님... 이대로 이별인가요?</S.TopTextCrying>
            <S.TopTextWondering>
              계정을 삭제하려는 이유가 궁금해요.
            </S.TopTextWondering>
          </S.TopTexts>
          <DeleteReasonOptionList
            deleteReasonOptionList={deleteReasonOptionList}
          />
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
              checked={agreementsChecked}
              handler={toggleAgreementsChecked}
              label={"주의사항을 모두 확인하였으며, 이에 동의합니다."}
              id={"agreement"}
            />
          </S.Agreement>
        </S.DeleteCautionAndAgreement>
      </S.wrapper>
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
  wrapper: styled.div`
    flex: 1;
    margin: 36px 16px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  TopTextsAndOptions: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
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
  DeleteContinue: styled.button`
    width: 100%;
  `,
};
