import styled from "styled-components";

const HisContent = (props) => {
  return (
    <ContentWrapper>
      <TopContentWrapper>
        <NameWrapper>
          <Name>{props.name}</Name>
        </NameWrapper>
        <Vline />
        <div style={{ width: "358px" }}>
          <Content>{props.content}</Content>
        </div>
      </TopContentWrapper>
      <Date>
        {props.isOnPray ? `${props.pray_cnt}회` : props.date.replace(/-/g, "/")}
      </Date>
      <Hline />
    </ContentWrapper>
  );
};

export default HisContent;

const Hline = styled.hr`
  width: 100%;
  color: "#CECECE";
  size: 1px;
  opacity: 0.5;
  border-right: 0;
  border-left: 0;
`;

const Vline = styled.div`
  border-left: 1px solid #cecece;
  height: 14px;
  margin-top: 4px;
`;

const ContentWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

const TopContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NameWrapper = styled.div``;

const Name = styled.div`
  color: #7bab6e;
  font-size: 14px;
  text-align: center;
  width: 71px;
  font-weight: 500;
  line-height: 20px;
`;

const Content = styled.div`
  color: #606060;
  font-size: 14px;
  margin-left: 8px;
  line-height: 20px;
  word-break: keep-all;
  width: 258px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Date = styled.div`
  display: flex;
  flex-direction: row-reverse;
  color: #7bab6e;
  font-size: 12px;
  margin: 8px 16px 12px 0px;
`;
