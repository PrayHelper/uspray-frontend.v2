import styled from "styled-components";

const LockerContent = (props) => {
  return (
    <LockerContentWrapper isClicked={props.isClicked}>
      <TopContentWrapper>
        <Name>{props.target}</Name>
        <NameNDate>
          {props.name}, D+{props.dday}
        </NameNDate>
      </TopContentWrapper>
      <Content>{props.title}</Content>
    </LockerContentWrapper>
  );
};

export default LockerContent;

const LockerContentWrapper = styled.div`
  cursor: pointer;
  padding: 16px;
  background-color: var(
    ${(props) => (props.isClicked ? "--color-white-75" : "--color-white")}
  );
  box-shadow: 0px 2px 8px var(--color-locker-content-shadow);
  border-radius: 16px;
  margin: 12px 24px;
  outline: ${(props) =>
    props.isClicked
      ? `2px solid var(--color-dark-green)`
      : `var(--color-white)`};
  transition: all 0.3s ease-in-out;
  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
    scale: ${(props) => (props.disabled ? "1" : "0.98")};
  }
`;

const TopContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;

const Name = styled.div`
  color: var(--color-dark-green);
  font-size: 12px;
  /* line-height: 17px; */
`;

const NameNDate = styled.div`
  color: var(--color-grey);
  font-size: 12px;
`;

const Content = styled.div`
  color: var(--color-dark-grey);
  font-size: 12px;
  line-height: 17px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
