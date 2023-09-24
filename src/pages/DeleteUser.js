import styled from "styled-components";
import UserHeader from "../components/UserHeader";

const DeleteUser = () => {
  return (
    <S.pageWrapper>
      <UserHeader>회원정보 확인</UserHeader>
      <S.pageContent>
        <S.text.crying>홍길동님... 이대로 이별인가요?</S.text.crying>
        <S.text.wondering>계정을 삭제하려는 이유가 궁금해요.</S.text.wondering>
        Delete Options....
        <S.text.deleteWarning>계정 삭제 전 주의사항</S.text.deleteWarning>
        <S.text.deleteInformation>
          - Uspray 계정 삭제 후 7일간 재가입이 불가능합니다.
        </S.text.deleteInformation>
        <S.text.deleteInformation>
          - Uspray 계정 삭제 후 7일간 재가입이 불가능합니다.
        </S.text.deleteInformation>
        <S.text.deleteInformation>
          - Uspary 계정 삭제 시 계정의 모든 정보는 삭제되며 재가입 시에도 복구할
          수 없습니다.
        </S.text.deleteInformation>
      </S.pageContent>
    </S.pageWrapper>
  );
};

export default DeleteUser;

const S = {
  pageWrapper: styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
  `,
  pageContent: styled.div`
    width: 100%;
    height: 100%;

    padding: 36px 16px 24px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  text: {
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
    deleteWarning: styled.div`
      color: var(--Grey, #a0a0a0);
      text-align: center;
      font-family: Noto Sans KR;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    `,
    deleteInformation: styled.div`
      color: var(--Grey, #a0a0a0);
      font-family: Noto Sans KR;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    `,
  },
  deleteReasonOption: styled.button`
    width: 100%;
  `,
  deleteContinue: styled.button`
    width: 100%;
  `,
};
