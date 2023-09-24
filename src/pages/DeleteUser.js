import styled from "styled-components";
import UserHeader from "../components/UserHeader";
import DeleteOptionList from "../components/DeleteOption/DeleteOptionList";
import Checkbox from "../components/Checkbox/Checkbox";
import { useState } from "react";

const DeleteUser = () => {
  const deleteOptionList = [
    { id: 0, text: "쓰지 않는 서비스에요.", checked: false },
    { id: 1, text: "원하는 기능이 없어요.", checked: false },
    { id: 2, text: "오류가 많아서 쓸 수가 없어요.", checked: false },
    { id: 3, text: "사용하기에 불편함이 있어요.", checked: false },
    { id: 4, text: "기타", checked: false },
  ];
  const [agreementChecked, setAgreementChecked] = useState(false);

  const toggleChecked = () => {
    setAgreementChecked(!agreementChecked);
  };

  return (
    <S.pageWrapper>
      <UserHeader>회원정보 확인</UserHeader>
      <S.content.wrapper>
        {/* 상단 - 텍스트와 옵션 묶기 */}
        <S.content.top.wrapper>
          <div>
            <S.content.top.crying>
              홍길동님... 이대로 이별인가요?
            </S.content.top.crying>
            <S.content.top.wondering>
              계정을 삭제하려는 이유가 궁금해요.
            </S.content.top.wondering>
          </div>
          <DeleteOptionList deleteOptionList={[]} />
        </S.content.top.wrapper>
        {/* 하단 - 주의사항과 동의 */}
        <S.content.bottom.wrapper>
          {/* 하단의 상단 - 주의사항 */}
          <S.content.bottom.top>
            <S.content.bottom.precautionTitle>
              계정 삭제 전 주의사항
            </S.content.bottom.precautionTitle>
            <S.content.bottom.divider />
            <S.content.bottom.precautionInformation>
              - Uspray 계정 삭제 후 7일간 재가입이 불가능합니다.
            </S.content.bottom.precautionInformation>
            <S.content.bottom.precautionInformation>
              - Uspary 계정 삭제 시 계정의 모든 정보는 삭제되며 재가입 시에도
              복구할 수 없습니다.
            </S.content.bottom.precautionInformation>
          </S.content.bottom.top>
          {/* 하단의 하단 - 주의사항에 동의 */}
          <S.content.bottom.bottom>
            <Checkbox
              checked={agreementChecked}
              handler={toggleChecked}
              label={"주의사항을 모두 확인하였으며, 이에 동의합니다."}
              id={"agreement"}
            />
          </S.content.bottom.bottom>
        </S.content.bottom.wrapper>
      </S.content.wrapper>
    </S.pageWrapper>
  );
};

export default DeleteUser;

const S = {
  pageWrapper: styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
  `,
  content: {
    wrapper: styled.div`
      flex: 1;
      margin: 36px 16px 24px 16px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `,
    top: {
      wrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `,
      crying: styled.div`
        color: var(--Dark_Gray, #606060);
        font-family: Noto Sans KR;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      `,
      wondering: styled.div`
        color: var(--Dark_Gray, #606060);
        font-family: Noto Sans KR;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      `,
    },
    bottom: {
      wrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 44px;
      `,
      top: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
      `,
      precautionTitle: styled.div`
        color: var(--Grey, #a0a0a0);
        text-align: center;
        font-family: Noto Sans KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      `,
      precautionInformation: styled.div`
        color: var(--Grey, #a0a0a0);
        font-family: Noto Sans KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      `,
      divider: styled.div`
        height: 1px;
        background: var(--Light_Grey, #eee);
        margin: 12px 0px;
      `,
      bottom: styled.div`
        display: flex;

        flex-direction: row;
        width: 100%;
      `,
    },
  },
  deleteContinue: styled.button`
    width: 100%;
  `,
};
